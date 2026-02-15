import React from 'react';

interface AvatarProps {
  name: string;
  className?: string;
}

const colors = [
  'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 
  'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500'
];

const Avatar: React.FC<AvatarProps> = ({ name, className = '' }) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getColor = (name: string) => {
    const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full text-white font-bold select-none ${getColor(name)} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
