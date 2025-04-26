import { Link } from "wouter";

type OpinionArticle = {
  id: number;
  authorImage: string;
  title: string;
  excerpt: string;
  author: string;
  occupation: string;
};

const opinionArticles: OpinionArticle[] = [
  {
    id: 1,
    authorImage: "bg-[#457b9d]",
    title: "Os desafios da mobilidade urbana nas grandes metrópoles",
    excerpt: "As soluções para o transporte público precisam considerar sustentabilidade e inclusão social...",
    author: "Paulo Martins",
    occupation: "Urbanista"
  },
  {
    id: 2,
    authorImage: "bg-[#e63946]",
    title: "Educação financeira deve ser prioridade nas escolas",
    excerpt: "Formar cidadãos conscientes sobre finanças pessoais é essencial para o desenvolvimento econômico do país...",
    author: "Mariana Santos",
    occupation: "Economista"
  },
  {
    id: 3,
    authorImage: "bg-[#a8dadc]",
    title: "O futuro da democracia na era digital",
    excerpt: "As redes sociais e a desinformação representam desafios sem precedentes para as instituições democráticas...",
    author: "André Carvalho",
    occupation: "Cientista Político"
  }
];

const OpinionSection = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-playfair font-bold text-[#1d3557] mb-8">Opinião</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Opinion Articles */}
        <div className="space-y-6">
          {opinionArticles.map((article, index) => (
            <article 
              key={article.id} 
              className={`flex ${index < opinionArticles.length - 1 ? 'border-b border-gray-200 pb-6' : ''}`}
            >
              <div className={`w-20 h-20 flex-shrink-0 rounded-full ${article.authorImage}`}></div>
              <div className="ml-4">
                <h3 className="font-playfair font-bold text-xl">{article.title}</h3>
                <p className="mt-2 text-gray-600 line-clamp-2">{article.excerpt}</p>
                <div className="mt-3 flex items-center">
                  <span className="font-medium text-[#1d3557]">{article.author}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500">{article.occupation}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Feature Opinion */}
        <div className="bg-[#f1faee] rounded-xl p-8">
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-[#457b9d]"></div>
            <div className="ml-4">
              <h3 className="font-playfair font-bold text-2xl">Luiza Mendes</h3>
              <p className="text-gray-600">Jornalista e Analista Internacional</p>
            </div>
          </div>
          <h2 className="font-playfair font-bold text-2xl mb-4">A nova ordem geopolítica e os impactos para o Brasil</h2>
          <p className="text-gray-700 mb-6">As mudanças no equilíbrio de poder global exigem uma postura estratégica do Brasil. A crescente polarização entre potências tradicionais e emergentes cria tanto desafios quanto oportunidades para nossa política externa.</p>
          <p className="text-gray-700 mb-6">Em um cenário onde alianças se reconfiguram constantemente, nossa posição como potência regional e player em fóruns multilaterais precisa ser repensada para garantir nossos interesses nacionais.</p>
          <Link href="#" className="text-[#e63946] font-medium hover:underline">Continuar lendo →</Link>
        </div>
      </div>
    </section>
  );
};

export default OpinionSection;
