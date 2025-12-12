import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LayoutPrivate({ children }) {
  const session = await auth();

  // Protect the dashboard
  if (!session) {
    redirect('/');
  }
  return <div className='min-h-screen bg-base-200'>{children}</div>;
}
