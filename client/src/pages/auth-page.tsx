import { useState, useEffect } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gamepad2, 
  Lock, 
  User, 
  AtSign, 
  MessageCircle,
  ExternalLink 
} from "lucide-react";
import { SiSteam } from "react-icons/si";

// Esquema de validação para login
const loginSchema = z.object({
  username: z.string().min(3, "Usuário deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

// Esquema de validação para registro
const registerSchema = z.object({
  username: z.string().min(3, "Usuário deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  displayName: z.string().min(3, "Nome de exibição deve ter pelo menos 3 caracteres").optional(),
  steamId: z.string().optional(),
  hexId: z.string().optional(),
  discordId: z.string().optional(),
});

function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [location, setLocation] = useLocation();
  const [, params] = useRoute("/auth?:tab");
  const { user, loginMutation, registerMutation } = useAuth();

  // Redireciona para dashboard se já estiver autenticado
  useEffect(() => {
    if (user) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  // Define o tab ativo com base nos parâmetros da URL
  useEffect(() => {
    if (params && params.tab === "register") {
      setActiveTab("register");
    }
  }, [params]);

  // Form para login
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Form para registro
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      displayName: "",
      steamId: "",
      hexId: "",
      discordId: "",
    },
  });

  // Função para submeter o login
  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values);
  };

  // Função para submeter o registro
  const onRegisterSubmit = (values: z.infer<typeof registerSchema>) => {
    registerMutation.mutate(values);
  };

  // UI para página de autenticação
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background-dark">
      {/* Seção principal (formulários) */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
        <div className="mb-8 text-center md:text-left">
          <Link href="/">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
              FISH<span className="text-white">GG</span>
            </span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-6">
            {activeTab === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}
          </h1>
          <p className="text-gray-400 mt-2">
            {activeTab === "login" 
              ? "Faça login para acessar seu painel e recursos exclusivos" 
              : "Registre-se para participar do melhor servidor de roleplay"}
          </p>
        </div>

        <Tabs 
          defaultValue="login" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full max-w-md mx-auto md:mx-0"
        >
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Registrar</TabsTrigger>
          </TabsList>

          {/* Formulário de Login */}
          <TabsContent value="login">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuário</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input 
                            placeholder="Seu nome de usuário" 
                            className="pl-10 bg-black/50 border-gray-700"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input 
                            type="password" 
                            placeholder="Sua senha" 
                            className="pl-10 bg-black/50 border-gray-700"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right">
                  <Link href="/recuperar-senha" className="text-sm text-primary hover:underline">
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-game" 
                  size="lg"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </Form>
          </TabsContent>

          {/* Formulário de Registro */}
          <TabsContent value="register">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                <FormField
                  control={registerForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuário</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input 
                            placeholder="Crie um nome de usuário" 
                            className="pl-10 bg-black/50 border-gray-700"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input 
                            type="password" 
                            placeholder="Crie uma senha forte" 
                            className="pl-10 bg-black/50 border-gray-700"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome de Exibição (opcional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input 
                            placeholder="Como você quer ser chamado" 
                            className="pl-10 bg-black/50 border-gray-700"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={registerForm.control}
                    name="steamId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="flex items-center gap-1">
                            Steam ID <span className="text-xs text-gray-500">(opcional)</span>
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <SiSteam className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                              placeholder="Seu Steam ID" 
                              className="pl-10 bg-black/50 border-gray-700"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="hexId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="flex items-center gap-1">
                            HEX ID <span className="text-xs text-gray-500">(opcional)</span>
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Gamepad2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                              placeholder="Seu HEX ID" 
                              className="pl-10 bg-black/50 border-gray-700"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={registerForm.control}
                  name="discordId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="flex items-center gap-1">
                          Discord ID <span className="text-xs text-gray-500">(opcional)</span>
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MessageCircle className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input 
                            placeholder="Seu Discord ID" 
                            className="pl-10 bg-black/50 border-gray-700"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-xs text-gray-400">
                  Ao registrar-se, você concorda com nossos {" "}
                  <Link href="/termos" className="text-primary hover:underline">
                    Termos de Serviço
                  </Link>{" "}
                  e{" "}
                  <Link href="/privacidade" className="text-primary hover:underline">
                    Política de Privacidade
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-game" 
                  size="lg"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? "Registrando..." : "Criar Conta"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>

      {/* Hero section (lado direito) */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-black to-background-dark p-6 md:p-12 flex items-center">
        <div className="max-w-lg mx-auto md:mx-0">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-4">
              <Gamepad2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">A melhor experiência de RolePlay</h2>
            <p className="text-gray-300">
              Acesse seu painel personalizado e gerencie todos os seus personagens, 
              faça whitelist, compre diamantes e muito mais!
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Gerencie seus Personagens</h3>
                <p className="text-gray-300 text-sm">
                  Acompanhe o progresso dos seus personagens, seus bens e estatísticas em tempo real.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Segurança Garantida</h3>
                <p className="text-gray-300 text-sm">
                  Seus dados são protegidos com os mais altos padrões de segurança.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <ExternalLink className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Conecte suas Contas</h3>
                <p className="text-gray-300 text-sm">
                  Vincule suas contas de Steam, Discord e outras plataformas para uma experiência integrada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;