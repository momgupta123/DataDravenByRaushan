import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div
      className="bg-red-900 border border-red-700 rounded-lg p-8 text-center"
      role="alert"
      aria-live="assertive"
    >
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <p className="text-red-100 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition-colors"
          aria-label="Retry loading data"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
