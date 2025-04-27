import Header from "@/components/header";
import HeroSection from "@/components/hero";
import Footer from "@/components/footer";
import ServerStats from "@/components/server-stats";
import { Newsletter } from "@/components/newsletter";
import { Gamepad2, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const Features = () => {
  return (
    <section className="py-16 bg-background-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Características do Servidor</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Nosso servidor oferece uma experiência de roleplay completa com vários sistemas exclusivos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card-dark p-6 rounded-lg border border-gray-800 hover:border-primary transition-colors duration-300"
            >
              <div className="mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const JoinSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-background-dark to-card-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://via.placeholder.com/1920x1080')] opacity-10 bg-center bg-cover"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Entre agora no Metropole RP e viva aventuras únicas em nosso servidor. Faça amigos, crie sua história e divirta-se!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-game hover:opacity-90 px-8 py-6 text-lg">
              Conectar ao Servidor
            </Button>
            <Button variant="outline" className="border-primary text-white hover:bg-primary hover:text-white px-8 py-6 text-lg">
              Fazer Whitelist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-white">
      <Header />
      <main>
        <HeroSection />
        <ServerStats />
        <Features />
        <JoinSection />
      </main>
      <Footer />
    </div>
  );
};

// Dados dos recursos do servidor
const features = [
  {
    icon: <Gamepad2 className="w-10 h-10" />,
    title: "Economia Realista",
    description: "Sistema econômico balanceado com empregos, salários, impostos e investimentos. Seja um empresário de sucesso!"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 15v-6l7.745 10.65A9 9 0 1 1 19 13h-2"></path><circle cx="19" cy="4" r="1"></circle><circle cx="9" cy="9" r="1"></circle></svg>,
    title: "Sistema de Drogas",
    description: "Cultive, processe e venda drogas pelo mapa. Cuidado com a polícia que pode apreender sua mercadoria!"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M20.4 14.5L16 10 4 20"></path></svg>,
    title: "Empregos Legais",
    description: "Mais de 20 empregos legais para escolher, como médico, mecânico, advogado, caminhoneiro, pescador e muito mais."
  },
  {
    icon: <ShieldCheck className="w-10 h-10" />,
    title: "Sistema Policial",
    description: "Polícia ativa com sistema de chamados, prisões, multas e uma variedade de crimes para investigar."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
    title: "Eventos Semanais",
    description: "Eventos organizados pela staff toda semana com prêmios especiais e muito entretenimento."
  },
  {
    icon: <Award className="w-10 h-10" />,
    title: "Sistema de Progressão",
    description: "Evolua seu personagem com níveis, habilidades e desbloqueie conteúdos exclusivos conforme progride no jogo."
  }
];

export default Home;
