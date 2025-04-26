import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FaSteam, FaUsers, FaServer } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="w-full bg-background-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                <span className="text-gradient-game">METROPOLE</span> GTA RP
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-gray-200">
                O melhor servidor de roleplay do Brasil
              </p>
            </div>
            
            <p className="text-gray-300 text-lg max-w-xl">
              Uma experiência imersiva de GTA RP com uma economia realista, 
              empregos legais e ilegais, tráfico de drogas, roubos a bancos, 
              polícia ativa e muito mais. Venha construir sua história em Metropole.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                className="bg-gradient-game hover:opacity-90 px-6 py-6 text-lg"
                size="lg"
              >
                <FaServer className="mr-2 h-5 w-5" />
                Conectar ao Servidor
              </Button>
              
              <Button 
                variant="outline" 
                className="border-primary text-white hover:bg-primary hover:text-white px-6 py-6 text-lg"
                size="lg"
              >
                <FaSteam className="mr-2 h-5 w-5" />
                Entrar com Steam
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-gray-300">Servidor Online</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="text-primary mr-2" />
                <span className="text-gray-300">198/250 jogadores</span>
              </div>
            </div>
          </div>
          
          {/* Server Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Atualização do Servidor */}
            <div className="bg-card-dark rounded-lg p-5 border border-gray-800 hover:border-primary transition-colors duration-300">
              <div className="flex items-center mb-3">
                <div className="h-8 w-1 bg-primary mr-3 rounded-full"></div>
                <h3 className="font-bold text-lg">Atualização Recente</h3>
              </div>
              <h4 className="font-medium mb-2 text-primary">Novos Veículos e Itens</h4>
              <p className="text-gray-300 text-sm mb-3">
                Adicionamos 15 novos veículos, novo sistema de plantação e mais empregos para você explorar!
              </p>
              <div className="text-xs text-gray-400">
                Atualizado em 25/04/2025
              </div>
            </div>
            
            {/* Evento Especial */}
            <div className="bg-card-dark rounded-lg p-5 border border-gray-800 hover:border-secondary transition-colors duration-300">
              <div className="flex items-center mb-3">
                <div className="h-8 w-1 bg-secondary mr-3 rounded-full"></div>
                <h3 className="font-bold text-lg">Evento da Semana</h3>
              </div>
              <h4 className="font-medium mb-2 text-secondary">Corrida Clandestina</h4>
              <p className="text-gray-300 text-sm mb-3">
                Participe da corrida clandestina! Prêmio de $100.000 para o vencedor.
              </p>
              <div className="text-xs text-gray-400">
                Sábado às 20h
              </div>
            </div>
            
            {/* Whitelist Aberta */}
            <div className="bg-card-dark rounded-lg p-5 border border-gray-800 hover:border-accent transition-colors duration-300">
              <div className="flex items-center mb-3">
                <div className="h-8 w-1 bg-accent mr-3 rounded-full"></div>
                <h3 className="font-bold text-lg">Whitelist Aberta</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Envie sua história e entre no servidor! Estamos com vagas disponíveis.
              </p>
              <Link href="/whitelist" className="text-accent hover:underline text-sm font-medium">
                Fazer aplicação →
              </Link>
            </div>
            
            {/* Discord */}
            <div className="bg-card-dark rounded-lg p-5 border border-gray-800 hover:border-primary transition-colors duration-300">
              <div className="flex items-center mb-3">
                <div className="h-8 w-1 bg-primary mr-3 rounded-full"></div>
                <h3 className="font-bold text-lg">Discord Oficial</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Entre no Discord para notícias, suporte e para encontrar outros jogadores!
              </p>
              <a 
                href="https://discord.gg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline text-sm font-medium"
              >
                Entrar no Discord →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
