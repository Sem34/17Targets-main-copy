import { useState } from 'react';
import Link from 'next/link';

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={toggleDropdown} 
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Послуги
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link href="/services/service1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Підпис документу</Link>
            <Link href="/services/service2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Підпис пакету документів</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
