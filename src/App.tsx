import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { toggleTheme } from './redux/themeSlice';
import PostList from './PostList';
import PostDetails from './PostDetails';
import Loader from './Loader';
import { Cover } from '../src/components/ui/cover'

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  const posts = useAppSelector((state) => state.posts.list);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <h1 className={`text-4xl font-bold cursor-pointer ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              <Cover>Posts</Cover>
            </h1>
          </Link>
          <button
            onClick={handleThemeToggle}
            className={`btn ${theme === 'dark' ? 'btn-secondary' : 'btn-primary'}`}
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <div className="mb-6">
          <p className="text-xl">Total Posts: {posts.length}</p>
        </div>
        <Loader />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;