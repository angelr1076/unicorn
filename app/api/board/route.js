import { auth } from '@/auth';
import connectDB from '@/libs/mongoose';
import Board from '@/models/Board';

export async function POST(req) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { name, description } = await req.json();

    if (!name || !description) {
      return new Response(
        JSON.stringify({ error: 'Name and description are required.' }),
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const board = await Board.create({
      userId: session.user.id,
      name,
      description,
    });

    return new Response(JSON.stringify(board), { status: 201 });
  } catch (error) {
    console.error('Create board error:', error);

    return new Response(JSON.stringify({ error: 'Failed to create board.' }), {
      status: 500,
    });
  }
}
