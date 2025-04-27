import { Button } from "@/components/ui/button";
import { HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Overlay de fundo com gradiente escuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-dark z-10"></div>
      
      {/* Imagem de fundo do hero */}
      <div className="absolute inset-0 bg-center bg-cover z-0" 
           style={{ backgroundImage: 'url("https://i.ibb.co/vzZGfD5/hero-bg.jpg")' }}>
      </div>
      
      {/* Conteúdo do hero */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="min-h-[80vh] flex flex-col justify-center py-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
                  FISH
                </span>
                <span className="text-white">GG</span>
                <span className="block text-white mt-2">
                  O melhor servidor de RolePlay
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore um mundo vasto e imersivo com economia realista, empregos diversificados e uma comunidade ativa. Crie sua história e viva aventuras únicas!
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button className="bg-gradient-game hover:opacity-90 h-12 px-8 text-base">
                Começar Agora
                <HiChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-primary text-white hover:bg-primary hover:text-white h-12 px-8 text-base">
                Conheça o Servidor
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-background-dark overflow-hidden">
                    <img 
                      src={`https://i.pravatar.cc/150?img=${num + 10}`} 
                      alt={`Player ${num}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-4 text-sm text-gray-300">
                <span className="font-bold text-white">+500</span> jogadores online agora
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Decoração de seta para baixo */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;