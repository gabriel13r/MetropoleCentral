import React, { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  Gamepad2, 
  User, 
  LogOut, 
  Diamond, 
  CreditCard,
  Ticket,
  File,
  Clock,
  BarChart3,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Dashboard() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();

  // Redirecionar para autenticação se não estiver logado
  useEffect(() => {
    if (!user) {
      setLocation("/auth");
    }
  }, [user, setLocation]);

  // Se não houver usuário, mostre mensagem de carregamento
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <span className="ml-3 text-gray-300">Carregando...</span>
      </div>
    );
  }

  // Função para lidar com o logout
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-gray-900/50 border-r border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <Link href="/">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              FISH<span className="text-white">GG</span>
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <div className="pb-4 mb-4 border-b border-gray-800">
            <p className="text-xs text-gray-500 uppercase mb-2 font-semibold">Menu Principal</p>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard">
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/characters">
                <User className="mr-2 h-4 w-4" />
                Meus Personagens
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/whitelist">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Whitelist
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/diamonds">
                <Diamond className="mr-2 h-4 w-4" />
                Diamantes
              </Link>
            </Button>
          </div>
          
          <div className="pb-4 mb-4 border-b border-gray-800">
            <p className="text-xs text-gray-500 uppercase mb-2 font-semibold">Suporte</p>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/tickets">
                <Ticket className="mr-2 h-4 w-4" />
                Meus Tickets
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/updates">
                <File className="mr-2 h-4 w-4" />
                Atualizações
              </Link>
            </Button>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={user.avatar} alt={user.displayName || user.username} />
              <AvatarFallback>{(user.displayName || user.username)?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.displayName || user.username}</p>
              <p className="text-xs text-gray-500">ID: {user.hexId || 'N/A'}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-start border-gray-700" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900/95 border-b border-gray-800 z-10">
        <div className="flex items-center justify-between p-4">
          <Link href="/">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              FISH<span className="text-white">GG</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/diamonds">
                <Diamond className="h-4 w-4 mr-1" />
                {user.diamonds}
              </Link>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.displayName || user.username} />
              <AvatarFallback>{(user.displayName || user.username)?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto md:pt-8 pt-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Olá, {user.displayName || user.username}!</h1>
          <p className="text-gray-400 mb-8">Bem-vindo ao seu painel de jogador.</p>
          
          {/* User Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Avatar className="h-16 w-16 mr-4 border-2 border-blue-500">
                    <AvatarImage src={user.avatar} alt={user.displayName || user.username} />
                    <AvatarFallback>{(user.displayName || user.username)?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-xl">{user.displayName || user.username}</p>
                    <p className="text-gray-400 text-sm">Steam ID: {user.steamId || 'N/A'}</p>
                    <p className="text-gray-400 text-sm">Hex ID: {user.hexId || 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Diamantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                      <Diamond className="h-8 w-8 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl">{user.diamonds}</p>
                      <p className="text-gray-400 text-sm">Diamantes disponíveis</p>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600" asChild>
                    <Link href="/dashboard/diamonds">Comprar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Status da Conta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Status de VIP:</p>
                    <span className={`px-2 py-1 rounded text-xs ${user.isVip ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                      {user.isVip ? 'ATIVO' : 'INATIVO'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Tipo de conta:</p>
                    <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-500">
                      {user.role?.toUpperCase() || 'JOGADOR'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Status da whitelist:</p>
                    <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-500">
                      PENDENTE
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs Section */}
          <Tabs defaultValue="characters">
            <TabsList className="mb-4">
              <TabsTrigger value="characters">Personagens</TabsTrigger>
              <TabsTrigger value="transactions">Transações</TabsTrigger>
              <TabsTrigger value="activity">Atividade</TabsTrigger>
            </TabsList>
            
            <TabsContent value="characters">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Meus Personagens</h2>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Novo Personagem
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center mb-4 md:mb-0">
                      <Gamepad2 className="h-10 w-10 text-blue-500 mr-4" />
                      <div>
                        <p className="font-medium text-lg">John Doe</p>
                        <p className="text-gray-400 text-sm">Policial • Nível 32</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center bg-gray-900 px-3 py-1 rounded-full">
                        <CreditCard className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">$45,250</span>
                      </div>
                      <div className="flex items-center bg-gray-900 px-3 py-1 rounded-full">
                        <Clock className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm">124h jogadas</span>
                      </div>
                      <Button size="sm" variant="outline" className="border-gray-700">
                        Jogar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center mb-4 md:mb-0">
                      <Gamepad2 className="h-10 w-10 text-purple-500 mr-4" />
                      <div>
                        <p className="font-medium text-lg">Clara Smith</p>
                        <p className="text-gray-400 text-sm">Médica • Nível 28</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center bg-gray-900 px-3 py-1 rounded-full">
                        <CreditCard className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">$32,140</span>
                      </div>
                      <div className="flex items-center bg-gray-900 px-3 py-1 rounded-full">
                        <Clock className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm">96h jogadas</span>
                      </div>
                      <Button size="sm" variant="outline" className="border-gray-700">
                        Jogar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="transactions">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Histórico de Transações</h2>
                
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="bg-green-500/20 p-2 rounded-full mr-4">
                        <Diamond className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Compra de Diamantes</p>
                        <p className="text-gray-400 text-sm">23 Abr 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="font-medium text-green-500">+1000 Diamantes</p>
                      <span className="ml-4 px-2 py-1 rounded text-xs bg-green-500/20 text-green-500">
                        CONCLUÍDO
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="bg-red-500/20 p-2 rounded-full mr-4">
                        <Diamond className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium">Uso de Diamantes - VIP</p>
                        <p className="text-gray-400 text-sm">15 Abr 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="font-medium text-red-500">-500 Diamantes</p>
                      <span className="ml-4 px-2 py-1 rounded text-xs bg-green-500/20 text-green-500">
                        CONCLUÍDO
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Atividade Recente</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start bg-gray-800/50 p-4 rounded-lg">
                    <div className="bg-blue-500/20 p-2 rounded-full mr-4">
                      <LogOut className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Login realizado</p>
                      <p className="text-gray-400 text-sm">Hoje, 15:30</p>
                      <p className="text-gray-500 text-sm mt-1">
                        Você fez login através da autenticação Steam.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-gray-800/50 p-4 rounded-lg">
                    <div className="bg-purple-500/20 p-2 rounded-full mr-4">
                      <Gamepad2 className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium">Personagem jogado</p>
                      <p className="text-gray-400 text-sm">Ontem, 20:45</p>
                      <p className="text-gray-500 text-sm mt-1">
                        Você jogou com o personagem John Doe por 3 horas.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-gray-800/50 p-4 rounded-lg">
                    <div className="bg-green-500/20 p-2 rounded-full mr-4">
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Solicitação de whitelist</p>
                      <p className="text-gray-400 text-sm">22 Abr 2025</p>
                      <p className="text-gray-500 text-sm mt-1">
                        Sua solicitação de whitelist foi enviada e está aguardando aprovação.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;