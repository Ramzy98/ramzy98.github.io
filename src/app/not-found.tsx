import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-gray-800/80 p-8 rounded-lg shadow-2xl">
        <div className="mb-8">
          <div className="text-9xl font-extrabold text-purple-400 animate-pulse">404</div>
          <div className="h-2 w-32 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-lg px-6 py-3 rounded-md transition duration-300 ease-in-out hover:from-purple-600 hover:to-pink-600 hover:shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
