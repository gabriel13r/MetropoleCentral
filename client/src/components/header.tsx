import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-playfair font-bold text-3xl text-[#1d3557]">
              Metropole
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#1d3557] hover:text-[#e63946] transition duration-200 font-medium">
              Início
            </Link>
            <Link href="#" className="text-[#1d3557] hover:text-[#e63946] transition duration-200 font-medium">
              Política
            </Link>
            <Link href="#" className="text-[#1d3557] hover:text-[#e63946] transition duration-200 font-medium">
              Economia
            </Link>
            <Link href="#" className="text-[#1d3557] hover:text-[#e63946] transition duration-200 font-medium">
              Cultura
            </Link>
            <Link href="#" className="text-[#1d3557] hover:text-[#e63946] transition duration-200 font-medium">
              Opinião
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-[#1d3557] hover:text-[#e63946] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Search and login buttons (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-[#1d3557] hover:text-[#e63946] transition">
              <Search className="h-5 w-5" />
            </button>
            <Button variant="default">Assine</Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" onClick={closeMenu} className="text-[#1d3557] hover:text-[#e63946] transition duration-200 font-medium">
                Início
              </Link>
              <Link href="#" onClick={closeMenu} className="text-[#1d3557] hover:text-[#e63946] transition duration-200 font-medium">
                Política
              </Link>
              <Link href="#" onClick={closeMenu} className="text-[#1d3557] hover:text-[#e63946] transition duration-200 font-medium">
                Economia
              </Link>
              <Link href="#" onClick={closeMenu} className="text-[#1d3557] hover:text-[#e63946] transition duration-200 font-medium">
                Cultura
              </Link>
              <Link href="#" onClick={closeMenu} className="text-[#1d3557] hover:text-[#e63946] transition duration-200 font-medium">
                Opinião
              </Link>
              <div className="pt-2 flex items-center justify-between">
                <button className="text-[#1d3557] hover:text-[#e63946] transition">
                  <Search className="h-5 w-5" />
                </button>
                <Button variant="default">Assine</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
