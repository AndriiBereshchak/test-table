import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchPostById } from './redux/postsSlice';
import { setLoading } from './redux/loaderSlice';
import { BackgroundLines } from './components/ui/background-lines';

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentPost, status, error } = useAppSelector((state) => state.posts);
  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (id) {
      dispatch(setLoading(true));
      dispatch(fetchPostById(parseInt(id, 10)))
        .finally(() => dispatch(setLoading(false)));
    }
  }, [id, dispatch]);

  if (status === 'loading') return null;
  if (status === 'failed') return <div className="text-red-500">Error: {error}</div>;
  if (!currentPost) return <div className="text-yellow-500">Post not found</div>;

  return (
    
    <BackgroundLines className="flex justify-center w-full min-h-screen">
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 max-w-2xl mx-auto`}>
        <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{currentPost.title}</h2>
        <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{currentPost.body}</p>
        <Link to="/" className="btn btn-secondary">
          Back to Post List
        </Link>
      </div>
    </BackgroundLines>
  );
};

export default PostDetails;