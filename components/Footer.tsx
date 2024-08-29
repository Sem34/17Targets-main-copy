// components/Footer.tsx

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white shadow-md py-4 mt-10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-600 text-sm mb-2 sm:mb-0">&copy; itGin. 2024 Всі права захищено.</p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-800 text-sm">
            Головна
          </Link>
          <Link href="/rules" className="text-gray-600 hover:text-gray-800 text-sm">
            Правила та умови
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
