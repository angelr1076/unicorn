import { NextResponse } from 'next/server';
import connectDB from '@/libs/mongoose';
import Post from '@/models/Post';

export async function POST(req) {
  try {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required.' },
        { status: 400 }
      );
    }

    await connectDB();

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }

    post.votesCounter += 1;
    await post.save();

    return NextResponse.json(
      { message: 'Vote counted successfully.' },
      { status: 200 }
    );
  } catch (e) {
    console.error('Vote error:', e);
    return NextResponse.json(
      { error: 'An error occurred while processing the vote.' },
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

    await connectDB();

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }

    post.votesCounter -= 1;
    await post.save();

    return NextResponse.json(
      { message: 'Vote removed successfully.' },
      { status: 200 }
    );
  } catch (e) {
    console.error('Unvote error:', e);
    return NextResponse.json(
      { error: 'An error occurred while processing the vote.' },
      { status: 500 }
    );
  }
}
