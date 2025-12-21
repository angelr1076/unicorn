export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { auth } from '@/auth';
import connectDB from '@/libs/mongoose';
import Board from '@/models/Board';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { name, description } = await req.json();

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required.' },
        { status: 400 }
      );
    }

    await connectDB();

    const board = await Board.create({
      userId: session.user.id,
      name,
      description,
    });

    return NextResponse.json(board, { status: 201 });
  } catch (error) {
    console.error('Create board error:', error);
    return NextResponse.json(
      { error: 'Failed to create board.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get('boardId');

    if (!boardId) {
      return NextResponse.json(
        { error: 'Board ID is required.' },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    await connectDB();

    const result = await Board.deleteOne({
      _id: boardId,
      userId: session.user.id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Board not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Board deleted successfully.' });
  } catch (e) {
    console.error('Delete board error:', e);
    return NextResponse.json(
      { error: 'Failed to delete board.' },
      { status: 500 }
    );
  }
}
