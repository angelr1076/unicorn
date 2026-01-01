import { auth } from '@/auth';
import connectDB from '@/libs/mongoose';
import Post from '@/models/Post';
import User from '@/models/User';
import Board from '@/models/Board';
import { NextResponse } from 'next/server';
import { Filter } from 'bad-words';

export async function POST(req) {
  try {
    const body = await req.json();

    const { title, description } = body;
    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get('boardId');
    const badWordFilter = new Filter();
    const sanitizedTitle = badWordFilter.clean(title) || '';
    const sanitizedDescription = description
      ? badWordFilter.clean(description)
      : '';

    if (!sanitizedTitle) {
      return NextResponse.json(
        { error: 'Title and Board ID are required.' },
        { status: 400 }
      );
    }

    await connectDB();
    const session = await auth();

    const newPost = await Post.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      boardId,
      userId: session?.user?.id || null,
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Failed to create post.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required.' },
        { status: 400 }
      );
    }

    const session = await auth();
    await connectDB();

    const user = await User.findById(session?.user?.id);
    if (!user.hasAccess) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this post.' },
        { status: 403 }
      );
    }

    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }

    const board = await Board.findById(post.boardId);
    if (board.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this post.' },
        { status: 403 }
      );
    }

    await Post.findByIdAndDelete(postId);
    return NextResponse.json(
      { message: 'Post deleted successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete post.' },
      { status: 500 }
    );
  }
}
