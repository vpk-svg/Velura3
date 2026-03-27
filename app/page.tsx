import { redirect } from 'next/navigation';

// This page ensures there is a root route to fallback on if middleware fails to catch `/` on some hosting platforms like Netlify.
export default function RootPage() {
  redirect('/nl');
}
