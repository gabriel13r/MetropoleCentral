import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Home from "@/pages/home";

// Configuração das rotas principais
function Router() {
  return (
    <Switch>
      {/* Rotas públicas */}
      <Route path="/" component={Home} />
      
      {/* Placeholder para todas as outras rotas */}
      <Route component={NotFound} />
    </Switch>
  );
}

// Componente para forçar o tema escuro
function ForceDarkMode() {
  useEffect(() => {
    // Define o tema como dark no documento HTML
    document.documentElement.classList.add('dark');
    // Remove a classe light se existir
    document.documentElement.classList.remove('light');
  }, []);
  
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" forcedTheme="dark">
        <ForceDarkMode />
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
