import Link from 'next/link';
import DropdownMenu from './DropdownMenu'; 
import { Button } from "@/components/ui/button"; 

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Branding */}
        <Link href="/" className="text-white text-2xl font-bold hover:text-gray-300 transition-colors duration-300">
          17 Цілей
        </Link>
        <div className="space-x-4 flex items-center">
          <DropdownMenu /> {/* Dropdown menu component */}
          {/* <Link href="/about" className="text-white hover:text-gray-300 transition-colors duration-300">Про Нас</Link> */}
          {/* <Link href="/contact" className="text-white hover:text-gray-300 transition-colors duration-300">Контакти</Link> */}
          <Link href="/rules">
          <Button className="bg-gray-700 text-white hover:bg-gray-200 hover:text-gray-800 hover:shadow-lg font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300">
  ОЗНАЙОМИТИСЯ
</Button>

          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
