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
      await apiRequest("POST", "/api/auth/test-login");
      window.location.href = "/dashboard";
    } catch (error) {
      toast({
        title: "Erro no login de teste",
        description: "Não foi possível fazer login com a conta de teste.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button
      variant="outline"
      className={`border-dashed border-2 flex items-center justify-center gap-2 ${className}`}
      onClick={handleTestLogin}
    >
      <span>Login de Desenvolvimento</span>
    </Button>
  );
}