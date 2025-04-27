import Header from "@/components/header";
import HeroSection from "@/components/hero";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

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
            Entre agora no FishGG e viva aventuras únicas em nosso servidor. Faça amigos, crie sua história e divirta-se!
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
        <JoinSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;