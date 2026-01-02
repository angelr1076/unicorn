import ButtonDeletePost from './ButtonDeletePost';
import ButtonVote from './ButtonVote';

const CardPost = ({ post }) => {
  return (
    <li className='bg-base-100 rounded-3xl p-6 shadow flex justify-between gap-6'>
      {/* Left content */}
      <div className='flex-1 space-y-2'>
        <h3 className='text-lg font-semibold leading-tight'>{post.title}</h3>

        {post.description && (
          <div className='text-sm text-base-content/80 leading-relaxed max-h-32 overflow-y-auto pr-2'>
            {post.description}
          </div>
        )}

        <div className='flex items-center gap-4 pt-3'>
          <span className='text-xs text-base-content/60'>
            Posted on {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <ButtonDeletePost postId={post._id.toString()} />
        </div>
      </div>

      {/* Right actions */}
      <div className='flex items-start'>
        <ButtonVote
          postId={post._id.toString()}
          initialVotes={post.votesCounter ?? 0}
        />
      </div>
    </li>
  );
};

export default CardPost;
