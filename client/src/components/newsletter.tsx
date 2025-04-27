import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UsersRound, Server, Clock } from "lucide-react";

const ServerStats = () => {
  return (
    <section className="py-20 bg-background-dark border-y border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Estatísticas do servidor */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Estatísticas do Servidor</h2>
            <p className="text-gray-300 mb-8">
              Nosso servidor está sempre em constante crescimento. 
              Confira nossos números atuais e faça parte desta comunidade!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-card-dark to-black p-6 rounded-lg border border-gray-800">
                <div className="flex items-center text-primary mb-4">
                  <UsersRound className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">40.000+</div>
                <div className="text-gray-400 text-sm">Usuários registrados</div>
              </div>
              
              <div className="bg-gradient-to-br from-card-dark to-black p-6 rounded-lg border border-gray-800">
                <div className="flex items-center text-primary mb-4">
                  <Server className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-gray-400 text-sm">Jogadores online</div>
              </div>
              
              <div className="bg-gradient-to-br from-card-dark to-black p-6 rounded-lg border border-gray-800">
                <div className="flex items-center text-primary mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-gray-400 text-sm">Servidor online</div>
              </div>
            </div>
          </div>
          
          {/* Formulário de newsletter */}
          <div className="bg-card-dark p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold mb-2 text-white">Receba Novidades</h3>
            <p className="text-gray-300 mb-6">
              Inscreva-se para receber atualizações, novidades e eventos especiais diretamente no seu e-mail.
            </p>
            
            <form className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Nome completo"
                  className="bg-black/50 border-gray-700 text-white"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="bg-black/50 border-gray-700 text-white"
                />
              </div>
              <Button className="w-full bg-gradient-game">
                Inscrever-se
              </Button>
              <p className="text-xs text-gray-500 mt-4">
                Ao se inscrever, você concorda com nossa política de privacidade.
                Não enviaremos spam, prometemos!
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerStats;