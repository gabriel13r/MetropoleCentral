import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, Diamond } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Notícias", href: "/noticias" },
    { name: "Galeria", href: "/galeria" },
    { name: "Loja", href: "/loja" },
    { name: "Suporte", href: "/suporte" },
  ];

  return (
    <header className="bg-black/40 backdrop-blur-md sticky top-0 z-50 border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
              FISH<span className="text-white">GG</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors px-3 py-2 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action buttons (desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <Link href="/dashboard">
                <Button variant="secondary" className="flex items-center gap-2">
                  <Diamond className="w-4 h-4" />
                  <span>{user.diamonds}</span>
                  <span className="ml-2">{user.displayName || user.username}</span>
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="outline">Entrar</Button>
                </Link>
                <Link href="/auth?register=true">
                  <Button className="bg-gradient-game">Registrar</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background-dark border-gray-800 w-[300px] p-0">
                <div className="flex flex-col h-full p-6">
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
                        FISH<span className="text-white">GG</span>
                      </span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-4 mb-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors py-2 text-lg font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto space-y-4">
                    {user ? (
                      <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-gradient-game">Acessar Painel</Button>
                      </Link>
                    ) : (
                      <>
                        <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="outline" className="w-full">Entrar</Button>
                        </Link>
                        <Link href="/auth?register=true" onClick={() => setMobileMenuOpen(false)}>
                          <Button className="w-full bg-gradient-game">Registrar</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;