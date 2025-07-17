import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
}
export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
    return (
        <footer className={`${
          isDarkMode ? " text-gray-300" : "text-gray-700"
        }  bottom-0 left-0 right-0 py-4 px-6 text-center z-10`}>
            <p className="text-sm">
              © {new Date().getFullYear()} Noneo. All rights reserved.
            </p>
            <p className="text-xs mt-1">
              Built with ❤️
            </p>
        </footer>
    );
}