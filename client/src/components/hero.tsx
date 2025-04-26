import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 pt-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Featured Story */}
        <div className="lg:col-span-2 group">
          <Link href="#" className="block relative overflow-hidden rounded-lg h-96">
            <div className="w-full h-full bg-[#457b9d] opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d3557] to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <span className="bg-[#e63946] px-2 py-1 text-sm font-semibold rounded">POLÍTICA</span>
              <h2 className="mt-4 text-3xl font-playfair font-bold leading-tight">Governo anuncia novo pacote de medidas econômicas para impulsionar crescimento</h2>
              <p className="mt-2 text-[#f1faee]">As medidas incluem estímulos fiscais e programas de investimento em infraestrutura.</p>
              <div className="mt-4 flex items-center">
                <p className="text-sm opacity-90">Por Ricardo Silva • 2h atrás</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Secondary Stories */}
        <div className="lg:col-span-1 space-y-6">
          {/* Secondary Story 1 */}
          <div className="group">
            <Link href="#" className="block relative overflow-hidden rounded-lg h-44">
              <div className="w-full h-full bg-[#a8dadc] opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d3557] to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <span className="bg-[#457b9d] px-2 py-1 text-xs font-semibold rounded">ECONOMIA</span>
                <h3 className="mt-2 text-xl font-playfair font-bold leading-tight">Bolsa atinge novo recorde com otimismo do mercado</h3>
                <div className="mt-2 flex items-center">
                  <p className="text-xs opacity-90">Por Ana Costa • 4h atrás</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary Story 2 */}
          <div className="group">
            <Link href="#" className="block relative overflow-hidden rounded-lg h-44">
              <div className="w-full h-full bg-[#f1faee] opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d3557] to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <span className="bg-[#a8dadc] text-[#1d3557] px-2 py-1 text-xs font-semibold rounded">TECNOLOGIA</span>
                <h3 className="mt-2 text-xl font-playfair font-bold leading-tight">Inteligência artificial transforma setor de saúde no Brasil</h3>
                <div className="mt-2 flex items-center">
                  <p className="text-xs opacity-90">Por Carlos Mendes • 6h atrás</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
