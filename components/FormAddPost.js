'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const FormAddPost = ({ boardId }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.post(`/api/post?boardId=${boardId}`, {
        title,
        description,
      });
      if (response.status === 201) {
        setTitle('');
        setDescription('');
        toast.success('Post created successfully!');
        router.refresh();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'An error occurred, please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className='bg-base-100 p-8 rounded-3xl shadow-md w-full md:w-96 shrink-0 md:sticky top-8'
      onSubmit={handleSubmit}>
      <h1 className='text-1xl font-bold mb-6'>Suggest a feature</h1>
      <div className='space-y-4'>
        <label className='text-xs opacity-80'>
          Short, descriptive titles are best
        </label>
        <input
          type='text'
          className='input input-bordered w-full'
          placeholder='Green buttons plz'
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={100}
        />
      </div>

      <div className='space-y-4 mt-4'>
        <label className='text-xs opacity-80'>Description</label>
        <textarea
          className='textarea textarea-bordered w-full h-28'
          placeholder='I would really like green buttons because...'
          value={description}
          onChange={e => setDescription(e.target.value)}
          maxLength={1000}
        />
      </div>

      <button className='btn btn-primary btn-block text-base mt-3'>
        {isLoading && (
          <span className='loading loading-spinner loading-sm'></span>
        )}
        Add Posts
      </button>
    </form>
  );
};

export default FormAddPost;
