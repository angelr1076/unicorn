import { redirect } from 'next/navigation';
import connectDB from '@/libs/mongoose';
import Board from '@/models/Board';
import { auth } from '@/auth';

const getBoard = async boardId => {
  await connectDB();

  const board = await Board.findById(boardId);
  if (!board) redirect('/dashboard');

  return board;
};

export default async function PublicFeedbackBoard({ params }) {
  const { boardId } = params;

  const board = await getBoard(boardId);
  return (
    <div>
      <main>{board.name} (public)</main>
    </div>
  );
}
