'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const FormNewBoard = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.post('/api/board', {
        name,
        description,
      });
      if (response.status === 201) {
        setName('');
        setDescription('');
        toast.success('Board created successfully!');
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
      className='bg-base-100 p-6 rounded-2xl shadow space-y-6'
      onSubmit={handleSubmit}>
      <fieldset className='fieldset'>
        <legend className='fieldset-legend'></legend>
        <input
          type='text'
          className='input'
          placeholder='Name your board'
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          className='input'
          placeholder='Describe your board'
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </fieldset>
      <button className='btn btn-primary btn-block' type='submit'>
        {isLoading && (
          <span className='loading loading-spinner loading-md'></span>
        )}
        Create Board
      </button>
    </form>
  );
};

export default FormNewBoard;
