import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function Newsletter() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !email) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulação de envio - em um ambiente real, isso seria uma chamada API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Inscrição realizada!",
        description: "Agora você receberá todas as novidades por e-mail.",
      });
      
      setNome("");
      setEmail("");
    } catch (error) {
      toast({
        title: "Erro ao realizar inscrição",
        description: "Ocorreu um problema ao processar sua solicitação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900/80 rounded-lg p-6 border border-gray-800">
      <h2 className="text-xl font-bold mb-2">Receba Novidades</h2>
      <p className="text-gray-400 text-sm mb-4">
        Inscreva-se para receber atualizações, novidades e eventos especiais diretamente no seu e-mail.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="bg-black/30 border-gray-700"
          />
        </div>
        
        <div>
          <Input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/30 border-gray-700"
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Inscrevendo-se..." : "Inscrever-se"}
        </Button>
      </form>
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        Ao se inscrever, você concorda com nossa política de privacidade. Não enviaremos spam, prometemos!
      </p>
    </div>
  );
}