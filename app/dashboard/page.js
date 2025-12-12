import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Dashboard() {
  const session = await auth();

  // Protect the dashboard
  if (!session) {
    redirect('/api/auth/signin');
  }

  const user = session.user;

  return (
    <main className='min-h-screen bg-base-200'>
      <div className='max-w-5xl mx-auto px-8 py-12'>
        {/* Header */}
        <header className='flex items-center justify-between mb-10'>
          <h1 className='text-3xl font-bold'>Dashboard</h1>

          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}>
            <button className='btn btn-outline btn-error'>Sign out</button>
          </form>
        </header>

        {/* User Card */}
        <section className='bg-base-100 rounded-2xl p-6 shadow mb-8'>
          <h2 className='text-xl font-semibold mb-2'>Your Account</h2>
          <p className='opacity-80'>
            Signed in as <strong>{user?.email}</strong>
          </p>
        </section>

        {/* App Content */}
        <section className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          <div className='bg-base-100 p-6 rounded-2xl shadow'>
            <h3 className='font-semibold mb-2'>Feedback Boards</h3>
            <p className='opacity-70 text-sm'>
              Create and manage customer feedback.
            </p>
          </div>

          <div className='bg-base-100 p-6 rounded-2xl shadow'>
            <h3 className='font-semibold mb-2'>Insights</h3>
            <p className='opacity-70 text-sm'>
              Track trends and prioritize features.
            </p>
          </div>

          <div className='bg-base-100 p-6 rounded-2xl shadow'>
            <h3 className='font-semibold mb-2'>Settings</h3>
            <p className='opacity-70 text-sm'>
              Manage billing and preferences.
            </p>
          </div>
        </section>

        {/* Footer Navigation */}
        <footer className='flex justify-between items-center'>
          <Link href='/' className='link link-hover'>
            ← Back to homepage
          </Link>

          <span className='text-sm opacity-60'>
            Unicorn SaaS © {new Date().getFullYear()}
          </span>
        </footer>
      </div>
    </main>
  );
}
