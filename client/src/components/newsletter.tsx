import { Button } from "@/components/ui/button";
import { Users, Clock, Calendar, Award, Gamepad2 } from "lucide-react";
import { FaSteam, FaDiscord } from "react-icons/fa";

// Em uma aplicação real, esses dados viriam de uma API
const serverStats = {
  totalPlayers: 8547,
  onlinePlayers: 198,
  maxPlayers: 250,
  serverUptime: "99.7%",
  activeFactions: 28,
  activeBusinesses: 45,
  whitelistApprovalRate: "87%",
  registeredVehicles: 3890,
  properties: 568,
  nextEventDate: "30/04/2025"
};

const ServerStats = () => {
  return (
    <section className="bg-background-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Estatísticas do <span className="text-gradient-game">Servidor</span></h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Metropole GTA RP tem uma comunidade vibrante com milhares de histórias sendo criadas todos os dias. Faça parte deste universo!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="bg-card-dark rounded-lg p-5 text-center hover:border-primary border border-gray-800 transition-colors duration-300">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                <Users size={28} className="text-primary" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-1">{serverStats.onlinePlayers}/{serverStats.maxPlayers}</h3>
            <p className="text-gray-400 text-sm">Jogadores Online</p>
          </div>

          <div className="bg-card-dark rounded-lg p-5 text-center hover:border-secondary border border-gray-800 transition-colors duration-300">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center">
                <FaSteam size={28} className="text-secondary" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-1">{serverStats.totalPlayers.toLocaleString()}</h3>
            <p className="text-gray-400 text-sm">Jogadores Registrados</p>
          </div>

          <div className="bg-card-dark rounded-lg p-5 text-center hover:border-accent border border-gray-800 transition-colors duration-300">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-accent bg-opacity-20 flex items-center justify-center">
                <Clock size={28} className="text-accent" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-1">{serverStats.serverUptime}</h3>
            <p className="text-gray-400 text-sm">Uptime do Servidor</p>
          </div>

          <div className="bg-card-dark rounded-lg p-5 text-center hover:border-primary border border-gray-800 transition-colors duration-300">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                <Award size={28} className="text-primary" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-1">{serverStats.whitelistApprovalRate}</h3>
            <p className="text-gray-400 text-sm">Taxa de Aprovação</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl p-8 items-center justify-between">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="font-bold text-3xl mb-4">Próximo Evento do Servidor</h2>
            <p className="text-gray-200 mb-4">
              Não perca o próximo grande evento de Metropole RP: <span className="font-semibold">Corrida Clandestina com Prêmio de $100.000</span> acontecendo em {serverStats.nextEventDate}.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" className="bg-gradient-game hover:opacity-90">
                <Gamepad2 className="mr-2 h-5 w-5" />
                Reservar Vaga
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-background-dark">
                <Calendar className="mr-2 h-5 w-5" />
                Calendário de Eventos
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8 flex flex-col">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm text-gray-300">Facções Ativas</p>
                <p className="text-xl font-bold">{serverStats.activeFactions}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm text-gray-300">Empresas</p>
                <p className="text-xl font-bold">{serverStats.activeBusinesses}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm text-gray-300">Veículos</p>
                <p className="text-xl font-bold">{serverStats.registeredVehicles}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm text-gray-300">Propriedades</p>
                <p className="text-xl font-bold">{serverStats.properties}</p>
              </div>
            </div>
            <a 
              href="https://discord.gg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-primary hover:underline mt-2"
            >
              <FaDiscord className="h-5 w-5" />
              Junte-se ao nosso Discord para mais informações
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerStats;
