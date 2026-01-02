import { redirect } from 'next/navigation';
import connectDB from '@/libs/mongoose';
import Board from '@/models/Board';
import Post from '@/models/Post';
import FormAddPost from '@/components/FormAddPost';
import CardPost from '@/components/CardPost';
import Link from 'next/link';

const getData = async boardId => {
  await connectDB();

  const board = await Board.findById(boardId);
  if (!board) redirect('/dashboard');

  const posts = await Post.find({ boardId }).sort({ voteCount: -1 });

  return { board, posts };
};

export default async function PublicFeedbackBoard({ params }) {
  const { boardId } = params;
  const { board, posts } = await getData(boardId);

  return (
    <main className='min-h-screen bg-base-200'>
      {/* Navbar */}
      <section className='bg-base-100'>
        <div className='max-w-5xl mx-auto px-5 py-4 flex items-center'>
          <Link href='/dashboard'>
            <button className='btn btn-ghost flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='size-4'>
                <path
                  fillRule='evenodd'
                  d='M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z'
                  clipRule='evenodd'
                />
              </svg>
              Back to Dashboard
            </button>
          </Link>
        </div>
      </section>
      <section className='max-w-5xl mx-auto p-5'>
        <h1 className='text-lg font-bold capitalize'>{board.name} (public) </h1>
      </section>
      <section className='max-w-5xl mx-auto px-5 flex flex-col md:flex-row md:items-start gap-8 pb-12'>
        <FormAddPost boardId={boardId} />
        <ul className='space-y-4 flex-grow'>
          {posts.map(post => (
            <CardPost key={post._id} post={post} />
          ))}
        </ul>
      </section>
    </main>
  );
}
