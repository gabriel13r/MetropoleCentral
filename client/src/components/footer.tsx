import { Link } from "wouter";
import { Button } from "./ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1d3557] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-playfair font-bold text-2xl mb-6">Metropole</h3>
            <p className="text-[#f1faee] opacity-80 mb-6">Jornalismo independente e análises aprofundadas sobre os temas mais relevantes do Brasil e do mundo.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#f1faee] hover:text-[#e63946] transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-[#f1faee] hover:text-[#e63946] transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-[#f1faee] hover:text-[#e63946] transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-[#f1faee] hover:text-[#e63946] transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-[#f1faee] hover:text-[#e63946] transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Seções</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#f1faee] opacity-80 hover:opacity-100 hover:text-[#e63946] transition">Política</Link></li>
              <li><Link href="#" className="text-[#f1faee] opacity-80 hover:opacity-100 hover:text-[#e63946] transition">Economia</Link></li>
              <li><Link href="#" className="text-[#f1faee] opacity-80 hover:opacity-100 hover:text-[#e63946] transition">Internacional</Link></li>
              <li><Link href="#" className="text-[#f1faee] opacity-80 hover:opacity-100 hover:text-[#e63946] transition">Tecnologia</Link></li>
              <li><Link href="#" className="text-[#f1faee] opacity-80 hover:opacity-100 hover:text-[#e63946] transition">Cultura</Link></li>
              <li><Link href="#" className="text-[#f1faee] opacity-80 hover:opacity-100 hover:text-[#e63946] transition">Esportes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Institucional</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#f1faee] opacity-80 hover:opacity-100 hover:text-[#e63946] transition">Sobre nós</Link></li>
              <li><Link href="#" className="text-[#f1faee] opacity-80 hover:opacity-100 hover:text-[#e63946] transition">Equipe editorial</Link></li>
              <li><Link href="#" className="text-[#f1faee] opacity-80 hover:opacity-100 hover:text-[#e63946] transition">Código de ética</Link></li>
              <li><Link href="#" className="text-[#f1faee] opacity-80 hover:opacity-100 hover:text-[#e63946] transition">Termos de uso</Link></li>
              <li><Link href="#" className="text-[#f1faee] opacity-80 hover:opacity-100 hover:text-[#e63946] transition">Política de privacidade</Link></li>
              <li><Link href="#" className="text-[#f1faee] opacity-80 hover:opacity-100 hover:text-[#e63946] transition">Trabalhe conosco</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Assine</h4>
            <p className="text-[#f1faee] opacity-80 mb-4">Tenha acesso a conteúdo exclusivo e ajude a manter um jornalismo independente e de qualidade.</p>
            <Button variant="default">Conheça os planos</Button>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-[#f1faee] opacity-60 text-sm">
            © {currentYear} Metropole. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
