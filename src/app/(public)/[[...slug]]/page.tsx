import { redirect } from 'next/navigation';

export default function DynamicLandingPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const pathSegment = params.slug ? params.slug.join('/') : '';
  
  // Redirects: /pune -> /delivery/pune
  // Redirects: /pune/koregaon-park -> /delivery/pune/koregaon-park
  redirect(`/delivery/${pathSegment}`);
}