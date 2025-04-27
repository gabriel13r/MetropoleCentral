import React from "react";
import { Users, Clock, Database } from "lucide-react";

export default function ServerStats() {
  return (
    <section className="py-10 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-3">Estatísticas do Servidor</h2>
            <p className="text-gray-400 mb-6">
              Nosso servidor está sempre em constante crescimento. Confira nossos números atuais e faça parte desta comunidade!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-800/60 p-4 rounded-lg text-center">
                <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">40.000+</div>
                <div className="text-gray-400 text-sm">Usuários registrados</div>
              </div>
              
              <div className="bg-gray-800/60 p-4 rounded-lg text-center">
                <Database className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">500+</div>
                <div className="text-gray-400 text-sm">Jogadores online</div>
              </div>
              
              <div className="bg-gray-800/60 p-4 rounded-lg text-center">
                <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-gray-400 text-sm">Servidor online</div>
              </div>
            </div>
          </div>
          
          <div>
            <img 
              src="https://via.placeholder.com/500x300" 
              alt="Jogadores online" 
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}