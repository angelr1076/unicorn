import ButtonDeletePost from './ButtonDeletePost';

const CardPostAdmin = ({ post }) => {
  return (
    <li className='bg-base-100 shadow rounded-xl p-5 space-y-3'>
      <h2 className='text-lg font-semibold'>{post.title}</h2>

      {post.description && (
        <div className='text-sm text-base-content/80 leading-relaxed max-h-32 overflow-y-auto'>
          {post.description}
        </div>
      )}

      <div className='flex items-center justify-between pt-2'>
        <span className='text-xs text-base-content/60'>
          Posted on {new Date(post.createdAt).toLocaleString()}
        </span>

        <ButtonDeletePost postId={post._id.toString()} />
      </div>
    </li>
  );
};

export default CardPostAdmin;
