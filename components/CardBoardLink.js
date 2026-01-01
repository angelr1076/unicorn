'use client';
import { toast } from 'react-hot-toast';

const CardBoardLink = ({ boardId }) => {
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
    <div className='bg-base-200 rounded-lg px-4 py-2 flex items-center gap-2 max-w-md mx-auto'>
      <p className='text-sm truncate flex-1'>{boardLink}</p>

      <button className='btn btn-sm btn-neutral btn-square' onClick={copyLink}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='size-5'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25'
          />
        </svg>
      </button>
    </div>
  );
};

export default CardBoardLink;
