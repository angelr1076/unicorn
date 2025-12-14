import { auth } from '@/auth';
import Link from 'next/link';
import ButtonLogout from '@/components/ButtonLogout';
import FormNewBoard from '@/components/FormNewBoard';
import connectDB from '@/libs/mongoose';
import User from '@/models/User';
import Board from '@/models/Board';
import { redirect } from 'next/navigation';

async function getUser() {
  const session = await auth();
  await connectDB();

  return await User.findById(session.user.id).lean();
}

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect('/api/auth/signin');

  await connectDB();

  const boards = await Board.find({
    userId: session.user.id,
  }).lean();

  return (
    <main className='min-h-screen bg-base-200'>
      <div className='max-w-5xl mx-auto px-8 py-12'>
        {/* Header */}
        <header className='flex items-center justify-between mb-10'>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <ButtonLogout />
        </header>

        {/* User Card */}
        <section className='bg-base-100 rounded-2xl p-6 shadow mb-8'>
          <h2 className='text-xl font-semibold mb-2'>Your Account</h2>
          <p className='opacity-80'>
            Signed in as <strong>{getUser()?.name || 'friend'}</strong>
          </p>
        </section>

        {/* App Content */}
        <section className='bg-base-100 rounded-2xl p-6 shadow mb-8'>
          <div className='flex flex-col md:flex-row gap-6'>
            {/* Left column: New Board */}
            <div className='w-full md:w-1/2'>
              <div className='bg-base-200 p-6 rounded-2xl h-full'>
                <h3 className='font-semibold mb-4'>New Board</h3>
                <FormNewBoard />
              </div>
            </div>

            {/* Right column: Boards */}
            <div className='w-full md:w-1/2'>
              <div className='bg-base-200 p-6 rounded-2xl h-full'>
                <h3 className='font-semibold mb-4'>Boards</h3>

                <div className='flex flex-col gap-4 font-extrabold text-lg '>
                  {boards.map(board => (
                    <div
                      key={board._id}
                      className='bg-base-100 rounded-xl p-4 shadow
                        hover:shadow-md transition'>
                      <h4 className='font-semibold'>{board.name}</h4>
                      {board.description && (
                        <p className='text-sm opacity-70 mt-1'>
                          {board.description}
                        </p>
                      )}
                    </div>
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
