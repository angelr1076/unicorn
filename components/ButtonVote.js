'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const ButtonUpvote = ({ postId, initialVotes }) => {
  const localStorageKeyName = `unicorn-hasVoted-${postId}`;
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [voteCount, setVoteCount] = useState(initialVotes ?? 0);

  useEffect(() => {
    const storedValue = localStorage.getItem(localStorageKeyName);
    setHasVoted(storedValue === 'true');
  }, []);

  const handleVote = async () => {
    if (isVoting || hasVoted) return;

    setIsVoting(true);

    try {
      if (hasVoted) {
        setHasVoted(false);
        setVoteCount(prev => prev - 1);
        await axios.delete(`/api/vote?postId=${postId}`);
        localStorage.removeItem(localStorageKeyName);
      } else {
        setHasVoted(true);
        setVoteCount(prev => prev + 1);
        await axios.post(`/api/vote?postId=${postId}`);
        localStorage.setItem(localStorageKeyName, 'true');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={isVoting || hasVoted}
      className={`group border px-4 py-2 rounded-xl text-xs duration-200 ease-in-out ${
        hasVoted
          ? 'bg-neutral text-neutral-outline text-white border-transparent'
          : 'bg-base-100 text-base-content hover:border-base-content/25 cursor-pointer'
      }`}>
      {isVoting ? (
        <span className='loading loading-spinner loading-xs'></span>
      ) : (
        <>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            strokeWidth={1.5}
            className='size-6 group-hover:-translate-y-0.5 duration-200 ease-in-out'>
            <path
              fillRule='evenodd'
              d='M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z'
              clipRule='evenodd'
            />
          </svg>
        </>
      )}
      <div>{voteCount}</div>
    </button>
  );
};

export default ButtonUpvote;
