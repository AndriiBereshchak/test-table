import React from 'react';
import { useAppSelector } from './redux/hooks';

const Loader: React.FC = () => {
  const isLoading = useAppSelector((state) => state.loader.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
};

export default Loader;