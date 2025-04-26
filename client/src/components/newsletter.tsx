import { Button } from "@/components/ui/button";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription for:", email);
    setEmail("");
    // Here you would typically send this to your backend
  };

  return (
    <section className="bg-[#1d3557] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#e63946] to-[#457b9d] rounded-xl p-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="font-playfair font-bold text-3xl mb-4">Assine nossa newsletter</h2>
            <p className="text-[#f1faee]">Receba as principais notícias e análises diretamente no seu email. Mantenha-se informado sobre os assuntos mais relevantes do Brasil e do mundo.</p>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <form 
              className="flex flex-col sm:flex-row" 
              onSubmit={handleSubmit}
            >
              <input 
                type="email" 
                placeholder="Seu email" 
                className="px-4 py-3 rounded-l sm:rounded-r-none text-[#1d3557] w-full focus:outline-none"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="dark"
                className="rounded-r sm:rounded-l-none mt-2 sm:mt-0"
              >
                Assinar
              </Button>
            </form>
            <p className="text-xs mt-3 text-[#f1faee] opacity-80">
              Ao assinar, você concorda com nossos Termos de Uso e Política de Privacidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
