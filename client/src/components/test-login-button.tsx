import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

interface TestLoginButtonProps {
  className?: string;
}

export function TestLoginButton({ className = "" }: TestLoginButtonProps) {
  const { toast } = useToast();
  const { user } = useAuth();

  // Não mostrar o botão se já estiver logado
  if (user) return null;

  const handleTestLogin = async () => {
    try {
      const response = await apiRequest("POST", "/api/auth/test-login");
      const userData = await response.json();
      console.log("[AUTH] Login de teste bem-sucedido, redirecionando...", userData);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("[AUTH] Erro no login de teste:", error);
      toast({
        title: "Erro no login de teste",
        description: "Não foi possível fazer login com a conta de teste.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button
      variant="secondary"
      className={`border-dashed border-2 flex items-center justify-center gap-2 py-6 px-8 text-lg font-semibold bg-green-700/30 hover:bg-green-700/40 border-green-600 text-green-300 ${className}`}
      onClick={handleTestLogin}
    >
      <span>Login de Desenvolvimento</span>
    </Button>
  );
}