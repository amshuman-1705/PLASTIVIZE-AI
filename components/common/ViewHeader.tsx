import React from 'react';
import { BackIcon } from '../icons/BackIcon';

interface ViewHeaderProps {
  title: string;
  onBack: () => void;
}

const ViewHeader: React.FC<ViewHeaderProps> = ({ title, onBack }) => {
  return (
    <div className="mb-6 sm:mb-8 flex items-center gap-4">
      <button
        onClick={onBack}
        className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300"
        aria-label="Go back to dashboard"
      >
        <BackIcon />
      </button>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text">{title}</h1>
    </div>
  );
};

export default ViewHeader;