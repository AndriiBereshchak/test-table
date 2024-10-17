import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchPosts } from './redux/postsSlice';
import { setLoading } from './redux/loaderSlice';

const PostList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: posts, status, error } = useAppSelector((state) => state.posts);
  const theme = useAppSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(setLoading(true));
      dispatch(fetchPosts())
        .finally(() => dispatch(setLoading(false)));
    }
  }, [status, dispatch]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === 'loading') return null;
  if (status === 'failed') return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`px-4 py-2 rounded-lg mb-4 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}
      />
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`py-3 px-6 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>ID</th>
                <th className={`py-3 px-6 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>Title</th>
                <th className={`py-3 px-6 text-center text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`${theme === 'dark' ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}`}>
              {filteredPosts.map(post => (
                <tr key={post.id} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                  <td className="py-4 px-6 whitespace-nowrap">{post.id}</td>
                  <td className="py-4 px-6">{post.title}</td>
                  <td className="py-4 px-6 text-center">
                    <Link to={`/post/${post.id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PostList;