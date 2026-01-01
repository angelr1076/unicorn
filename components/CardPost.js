const CardPost = ({ post }) => {
  return (
    <li className='bg-base-100 rounded-xl shadow p-5 space-y-3'>
      <h3 className='text-lg font-semibold leading-tight'>{post.title}</h3>

      {post.description && (
        <div className='text-sm text-base-content/80 leading-relaxed max-h-32 overflow-y-auto pr-1'>
          {post.description}
        </div>
      )}

      <div className='flex items-center justify-between pt-2'>
        <span className='text-xs text-base-content/60'>
          Posted on {new Date(post.createdAt).toLocaleDateString()}
        </span>

        <button className='btn btn-sm btn-outline'>Button Here</button>
      </div>
    </li>
  );
};

export default CardPost;
