import React from 'react';

export default function loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
      <p className="text-lg font-medium">Loading, please wait...</p>
    </div>
  );
}