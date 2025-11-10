import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// Import your custom UserService
import { UserService } from '@/app/_libs/services/user.service';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    /**
     * Provider 1: Google
     */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    /**
     * Provider 2: Email & Password (Credentials)
     */
    CredentialsProvider({
      name: 'Credentials',
      // We use our own form, but NextAuth needs this structure
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      /**
       * This 'authorize' function runs your custom validation logic
       */
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        // 1. Use your UserService's validatePassword method
        // (This assumes validatePassword now returns the user object with the 'role' field)
        const user = await UserService.validatePassword(
          credentials.email,
          credentials.password,
        );

        if (user) {
          // 2. If valid, return the user object (with the role)
          // This object is passed to the 'jwt' callback
          return user; 
        } else {
          // 3. If invalid, throw an error to show in the form
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],

  // =================================================================
  // SESSION & CALLBACK CONFIGURATION
  // =================================================================
  
  session: {
    strategy: 'jwt', // Use JSON Web Tokens for sessions
  },

  secret: process.env.NEXTAUTH_SECRET!, // Your session secret

  callbacks: {
    /**
     * The `signIn` callback is triggered *before* a sign-in is completed.
     * This is where we create a user for Google sign-in.
     */
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') {
        return true; // Auth was already handled by 'authorize'
      }

      if (account?.provider === 'google') {
        if (!user.email || !user.name) {
          return false; // Missing info from Google
        }
        
        try {
          // Use your UserService to find or create the user
          // The DB will assign the default role 'user'
          const dbUser = await UserService.findOrCreateProviderUser({
            email: user.email,
            name: user.name,
          });
          
          return !!dbUser; // Allow sign-in if user was found/created
        } catch (error) {
          console.error('Google signIn callback error:', error);
          return false; // Prevent sign-in on error
        }
      }
      return false; // Deny by default
    },

    /**
     * The `jwt` callback is called when a JWT is created (on sign-in).
     * This is where we get the *real* Postgres ID and role into the token.
     */
    async jwt({ token, user }) {
      // 'user' is only present on the *initial* sign-in
      if (user) {
        // We MUST fetch our *own* DB user to get the correct Postgres ID and role.
        const dbUser = await UserService.getUserByEmail(user.email!);
        
        if (dbUser) {
          token.id = dbUser.id; // This is the integer ID from Postgres
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.role = dbUser.role; // <-- **THIS IS THE MODIFICATION**
        }
      }
      return token;
    },

    /**
     * The `session` callback is called when a session is accessed (e.g., `useSession()`).
     * It copies data from the JWT (token) to the frontend session object.
     */
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as number; // Add the ID to the session
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role; // <-- **THIS IS THE MODIFICATION**
      }
      return session;
    },
  },
};

// Export the NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
