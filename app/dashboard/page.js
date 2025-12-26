import { auth } from '@/auth';
import connectDB from '@/libs/mongoose';
import User from '@/models/User';
import Board from '@/models/Board';
import { redirect } from 'next/navigation';

import ButtonCheckout from '@/components/ButtonCheckout';
import ButtonPortal from '@/components/ButtonPortal';
import ButtonLogout from '@/components/ButtonLogout';
import FormNewBoard from '@/components/FormNewBoard';
import Link from 'next/link';

async function getUser() {
  const session = await auth();
  if (!session?.user?.email) return null;

  await connectDB();
  return await User.findOne({ email: session.user.email }).lean();
}

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect('/api/auth/signin');

  const user = await getUser();

  await connectDB();
  const boards = await Board.find({ userId: session.user.id }).lean();

  return (
    <main className='min-h-screen bg-base-200'>
      <div className='max-w-5xl mx-auto px-8 py-12'>
        <header className='flex items-center justify-between mb-10'>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          {user?.hasAccess ? <ButtonPortal /> : <ButtonCheckout />}
          <ButtonLogout />
        </header>

        <section className='bg-base-100 rounded-2xl p-6 shadow mb-8'>
          <h2 className='text-xl font-semibold mb-2'>Your Account</h2>
          <p>
            Signed in as <strong>{user?.firstName || 'User'}</strong>
          </p>
        </section>

        <section className='bg-base-100 rounded-2xl p-6 shadow'>
          <div className='flex flex-col md:flex-row gap-6'>
            {/* Left: New Board */}
            <div className='w-full md:w-1/2'>
              <div className='bg-base-200 p-6 rounded-2xl h-full'>
                <h3 className='font-semibold mb-4'>New Board</h3>
                <FormNewBoard />
              </div>
            </div>

            {/* Right: Boards */}
            <div className='w-full md:w-1/2'>
              <div className='bg-base-200 p-6 rounded-2xl h-full'>
                <h3 className='font-semibold mb-4'>Boards</h3>

                <div className='flex flex-col gap-4 font-semibold'>
                  {boards.map(board => (
                    <Link
                      key={board._id}
                      href={`/dashboard/b/${board._id}`}
                      className='bg-base-100 rounded-xl p-4 shadow hover:shadow-lg transition-shadow'>
                      <div className='font-bold'>{board.name}</div>
                      {board.description && (
                        <p className='text-sm opacity-70 mt-1'>
                          {board.description}
                        </p>
                      )}
                    </Link>
                  ))}

                  {boards.length === 0 && (
                    <p className='text-sm opacity-60'>
                      No boards yet — create your first one 👈
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className='flex justify-between items-center mt-8'>
          <Link href='/' className='link'>
            ← Back to homepage
          </Link>
        </footer>
      </div>
    </main>
  );
}
