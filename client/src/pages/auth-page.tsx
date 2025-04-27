import React, { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { SteamLoginButton } from "@/components/steam-login-button";
import { Gamepad2, Shield, Users, Clock } from "lucide-react";

function AuthPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Redireciona para dashboard se já estiver autenticado
  useEffect(() => {
    if (user) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="w-full border-b border-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              FISH<span className="text-white">GG</span>
            </span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">
              Início
            </Link>
            <Link href="/noticias" className="hover:text-blue-500 transition-colors">
              Notícias
            </Link>
            <Link href="/loja" className="hover:text-blue-500 transition-colors">
              Loja
            </Link>
            <Link href="/suporte" className="hover:text-blue-500 transition-colors">
              Suporte
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Column - Auth */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
              Entre no servidor <span className="text-blue-500">FishGG</span>
            </h1>
            <p className="text-gray-400 mb-10 text-center md:text-left max-w-md">
              Faça login com sua conta Steam para acessar nosso servidor, gerenciar seus personagens e participar de nossa comunidade.
            </p>
            
            <div className="flex flex-col items-center w-full md:items-start space-y-6">
              <SteamLoginButton variant="large" className="w-full md:w-auto" />
              
              <div className="text-sm text-gray-500 max-w-md text-center md:text-left">
                Ao continuar, você concorda com nossos {" "}
                <Link href="/termos" className="text-blue-500 hover:underline">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="text-blue-500 hover:underline">
                  Política de Privacidade
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-center">Estatísticas do Servidor</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">40.000+</div>
                <div className="text-gray-400 text-sm">Usuários registrados</div>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">500+</div>
                <div className="text-gray-400 text-sm">Jogadores online</div>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-gray-400 text-sm">Servidor online</div>
              </div>
            </div>
            
            <p className="text-gray-400 text-center text-sm">
              Nosso servidor está sempre em constante crescimento. Confira nossos números atuais e faça parte desta comunidade!
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/30 border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} FishGG. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

export default AuthPage;