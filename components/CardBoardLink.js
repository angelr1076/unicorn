'use client';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const CardBoardLink = ({ boardId }) => {
  const publicPath = `/b/${boardId}`;
  const boardLink = `${
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://automatiq.space'
  }/b/${boardId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(boardLink);
    toast.success('Board link copied to clipboard');
  };

  return (
    <div className='bg-base-200 rounded-lg px-4 py-2 flex flex-wrap items-center gap-2 max-w-md mx-auto'>
      <p className='text-sm truncate flex-1 min-w-0'>{boardLink}</p>

      <Link
        href={publicPath}
        className='btn btn-sm btn-neutral'
        target=''
        rel='noreferrer'>
        Add Feedback
      </Link>

      <button className='btn btn-sm btn-neutral btn-square' onClick={copyLink}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='size-4'>
          <path d='M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z' />
          <path d='M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z' />
        </svg>
      </button>
    </div>
  );
};

export default CardBoardLink;
