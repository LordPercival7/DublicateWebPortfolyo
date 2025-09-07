import React from 'react';
import { Cpu } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="relative mb-8">
          <Cpu className="w-16 h-16 mx-auto animate-pulse text-blue-400" />
          <div className="absolute inset-0 w-16 h-16 mx-auto animate-spin border-2 border-transparent border-t-blue-400 rounded-full"></div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Burak Gökçek Portfolio</h2>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};