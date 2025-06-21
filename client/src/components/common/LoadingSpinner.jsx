import React from 'react';
import { Camera } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <div className="text-white text-xl font-semibold mb-4">DropChallenge</div>
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;