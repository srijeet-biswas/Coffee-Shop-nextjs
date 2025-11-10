import 'next-auth';
import { DefaultSession } from 'next-auth';

// 1. Define your Role type
type Role = 'user' | 'admin' | 'merchant';

/**
 * Augment the 'next-auth' module types
 */
declare module 'next-auth' {
  /**
   * The `session.user` object, available on the frontend.
   */
  interface Session {
    user: {
      /** This is the integer ID from your Postgres database */
      id: number; 
      /** This is the role from your Postgres database */
      role: Role; 
    } & DefaultSession['user']; // Keeps original fields like 'name', 'email', 'image'
  }

  /**
   * The object returned from the `authorize` function (for credentials)
   * or the profile object (for providers).
   */
  interface User {
     id?: number; 
     role: Role; // Add role to the User object
  }
}

declare module 'next-auth/jwt' {
  /**
   * The JWT token, stored in the session cookie.
   */
  interface JWT {
    /** This is the integer ID from your Postgres database */
    id: number;
    /** This is the role from your Postgres database */
    role: Role;
    name: string | null | undefined;
    email: string | null | undefined;
  }
}