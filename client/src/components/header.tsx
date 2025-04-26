import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LogIn, Menu, X, Users, Gamepad2, Book, Award, HelpCircle, Download } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSteamLogin = () => {
    // Implementação futura da autenticação com Steam
    console.log("Steam login clicked");
  };

  return (
    <header className="bg-card-dark text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-3xl text-gradient-game">
              METROPOLE
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-primary transition duration-200 font-medium flex items-center gap-1">
              <Gamepad2 size={18} />
              <span>Servidor</span>
            </Link>
            <Link href="/characters" className="text-white hover:text-primary transition duration-200 font-medium flex items-center gap-1">
              <Users size={18} />
              <span>Personagens</span>
            </Link>
            <Link href="/rules" className="text-white hover:text-primary transition duration-200 font-medium flex items-center gap-1">
              <Book size={18} />
              <span>Regras</span>
            </Link>
            <Link href="/whitelist" className="text-white hover:text-primary transition duration-200 font-medium flex items-center gap-1">
              <Award size={18} />
              <span>Whitelist</span>
            </Link>
            <Link href="/support" className="text-white hover:text-primary transition duration-200 font-medium flex items-center gap-1">
              <HelpCircle size={18} />
              <span>Suporte</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-white hover:text-primary focus:outline-none"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Login/Download buttons (desktop) */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary text-white hover:bg-primary hover:text-white"
              onClick={handleSteamLogin}
            >
              <LogIn className="h-4 w-4 mr-1" />
              Entrar com Steam
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-gradient-game hover:opacity-90"
            >
              <Download className="h-4 w-4 mr-1" />
              Baixar Launcher
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link href="/" onClick={closeMenu} className="text-white hover:text-primary transition duration-200 font-medium flex items-center gap-2">
                <Gamepad2 size={18} />
                <span>Servidor</span>
              </Link>
              <Link href="/characters" onClick={closeMenu} className="text-white hover:text-primary transition duration-200 font-medium flex items-center gap-2">
                <Users size={18} />
                <span>Personagens</span>
              </Link>
              <Link href="/rules" onClick={closeMenu} className="text-white hover:text-primary transition duration-200 font-medium flex items-center gap-2">
                <Book size={18} />
                <span>Regras</span>
              </Link>
              <Link href="/whitelist" onClick={closeMenu} className="text-white hover:text-primary transition duration-200 font-medium flex items-center gap-2">
                <Award size={18} />
                <span>Whitelist</span>
              </Link>
              <Link href="/support" onClick={closeMenu} className="text-white hover:text-primary transition duration-200 font-medium flex items-center gap-2">
                <HelpCircle size={18} />
                <span>Suporte</span>
              </Link>
              <div className="pt-3 flex flex-col space-y-3 border-t border-gray-800">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-primary text-white hover:bg-primary hover:text-white"
                  onClick={handleSteamLogin}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Entrar com Steam
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-gradient-game hover:opacity-90"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Baixar Launcher
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
