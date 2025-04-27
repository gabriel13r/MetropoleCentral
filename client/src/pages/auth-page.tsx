import React, { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { SteamLoginButton } from "@/components/steam-login-button";
import { TestLoginButton } from "@/components/test-login-button";
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
        <div className="flex flex-col items-center justify-center max-w-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Entre no servidor <span className="text-blue-500">FishGG</span>
          </h1>
          <p className="text-gray-300 mb-4 text-center max-w-md">
            Faça login com sua conta Steam para acessar nosso servidor, gerenciar seus personagens e participar de nossa comunidade.
          </p>
          <p className="text-blue-400 text-sm mb-10 text-center">
            Utilizamos autenticação oficial Steam - você será redirecionado para o login seguro.
          </p>
          
          <div className="flex flex-col items-center w-full space-y-6">
            <SteamLoginButton variant="large" className="w-full md:w-auto" />
            
            {/* Botão de login de teste removido para usar apenas autenticação Steam real */}
            
            <div className="text-sm text-gray-500 max-w-md text-center">
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