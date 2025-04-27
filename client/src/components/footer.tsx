import { Link } from "wouter";
import { SiDiscord, SiInstagram, SiTiktok, SiYoutube, SiFacebook } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Logo e social */}
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
                FISH<span className="text-white">GG</span>
              </span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              O melhor servidor de RolePlay brasileiro. Venha criar sua história 
              e viver aventuras incríveis!
            </p>
            
            <div className="flex space-x-4 mt-6">
              <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <SiDiscord className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <SiInstagram className="w-6 h-6" />
              </a>
              <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <SiTiktok className="w-6 h-6" />
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <SiYoutube className="w-6 h-6" />
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <SiFacebook className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Navegação</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-primary transition-colors">Início</Link></li>
                <li><Link href="/noticias" className="text-gray-400 hover:text-primary transition-colors">Notícias</Link></li>
                <li><Link href="/galeria" className="text-gray-400 hover:text-primary transition-colors">Galeria</Link></li>
                <li><Link href="/loja" className="text-gray-400 hover:text-primary transition-colors">Loja</Link></li>
                <li><Link href="/suporte" className="text-gray-400 hover:text-primary transition-colors">Suporte</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Informações</h3>
              <ul className="space-y-2">
                <li><Link href="/sobre" className="text-gray-400 hover:text-primary transition-colors">Sobre Nós</Link></li>
                <li><Link href="/regras" className="text-gray-400 hover:text-primary transition-colors">Regras</Link></li>
                <li><Link href="/guias" className="text-gray-400 hover:text-primary transition-colors">Guias</Link></li>
                <li><Link href="/termos" className="text-gray-400 hover:text-primary transition-colors">Termos de Serviço</Link></li>
                <li><Link href="/privacidade" className="text-gray-400 hover:text-primary transition-colors">Política de Privacidade</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Contato</h3>
              <ul className="space-y-2">
                <li><a href="mailto:contato@fishgg.com" className="text-gray-400 hover:text-primary transition-colors">contato@fishgg.com</a></li>
                <li><a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} FISHGG. Todos os direitos reservados.
          </p>
          <div className="text-gray-500 text-sm">
            Desenvolvido por <a href="#" className="text-primary hover:underline">FishGG Team</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;