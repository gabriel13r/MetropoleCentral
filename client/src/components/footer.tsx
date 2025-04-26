import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FaDiscord, FaInstagram, FaTiktok, FaYoutube, FaSteam } from "react-icons/fa";
import { Download } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-2xl mb-6 text-gradient-game">METROPOLE RP</h3>
            <p className="text-white opacity-80 mb-6">
              Servidor de GTA RP com foco em roleplay de qualidade e experiência imersiva. Junte-se a nós e viva aventuras únicas em nossa cidade virtual.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition" aria-label="Discord">
                <FaDiscord className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition" aria-label="TikTok">
                <FaTiktok className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition" aria-label="YouTube">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition" aria-label="Steam">
                <FaSteam className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition">Início</Link></li>
              <li><Link href="/regras" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition">Regras</Link></li>
              <li><Link href="/forum" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition">Fórum</Link></li>
              <li><Link href="/servidor" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition">Servidor</Link></li>
              <li><Link href="/whitelist" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition">Whitelist</Link></li>
              <li><Link href="/rankings" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition">Rankings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li><Link href="/sobre" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition">Sobre o servidor</Link></li>
              <li><Link href="/equipe" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition">Nossa equipe</Link></li>
              <li><Link href="/faq" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition">Perguntas frequentes</Link></li>
              <li><Link href="/termos" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition">Termos de uso</Link></li>
              <li><Link href="/privacidade" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition">Política de privacidade</Link></li>
              <li><Link href="/contato" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Jogar Agora</h4>
            <p className="text-white opacity-80 mb-4">Baixe nosso launcher exclusivo e entre no servidor para a melhor experiência de GTA RP!</p>
            <Button variant="default" className="bg-gradient-game hover:opacity-90 w-full">
              <Download className="h-4 w-4 mr-2" />
              Baixar Launcher
            </Button>
            <div className="mt-4">
              <p className="text-xs text-white opacity-60">Compatível com Windows 10/11</p>
              <p className="text-xs text-white opacity-60 mt-1">Versão atual: 1.2.5</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white opacity-60 text-sm">
              © {currentYear} Metropole RP. Todos os direitos reservados.
            </p>
            <p className="text-white opacity-60 text-sm mt-2 md:mt-0">
              Não afiliado à Rockstar Games ou Take-Two Interactive
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
