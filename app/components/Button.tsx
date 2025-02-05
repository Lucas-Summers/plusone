import React from 'react';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] });

interface ButtonProps {
  text: string;
  dark?: boolean;
  full?: boolean;
  onClick?: () => void; 
}

const Button: React.FC<ButtonProps> = ({ text, dark = false, full = false, onClick }) => {
  const className = [
    'rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-indigo-600',
    dark ? 'text-white bg-indigo-600' : 'text-indigo-600',
    full ? 'grid place-items-center w-full' : '',
  ].join(' ');

  return (
    <button onClick={onClick} className={className}>
      <p className={`px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ${nunito.className}`}>{text}</p>
    </button>
  );
};

export default Button;
