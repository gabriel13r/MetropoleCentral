import { Link } from "wouter";

type NewsArticle = {
  id: number;
  image: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  author: string;
  timeAgo: string;
};

const latestNewsData: NewsArticle[] = [
  {
    id: 1,
    image: "bg-[#e63946]",
    category: "POLÍTICA",
    categoryColor: "text-[#e63946]",
    title: "Senado aprova projeto de lei que altera regras eleitorais",
    excerpt: "Novas diretrizes para campanhas políticas e financiamento eleitoral foram aprovadas após intenso debate no plenário.",
    author: "Márcia Oliveira",
    timeAgo: "18 min atrás"
  },
  {
    id: 2,
    image: "bg-[#457b9d]",
    category: "ECONOMIA",
    categoryColor: "text-[#457b9d]",
    title: "Banco Central mantém taxa de juros e sinaliza próximos passos",
    excerpt: "Decisão foi unânime entre os membros do Copom, que indicou cautela com o cenário inflacionário nos próximos meses.",
    author: "Fernando Gomes",
    timeAgo: "1h atrás"
  },
  {
    id: 3,
    image: "bg-[#a8dadc]",
    category: "CULTURA",
    categoryColor: "text-[#a8dadc]",
    title: "Festival internacional de cinema anuncia programação completa",
    excerpt: "Evento contará com mais de 100 filmes de 40 países diferentes, com destaque para produções latino-americanas.",
    author: "Juliana Castro",
    timeAgo: "3h atrás"
  }
];

const LatestNews = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-playfair font-bold text-[#1d3557]">Últimas Notícias</h2>
          <Link href="#" className="text-[#e63946] hover:underline font-medium">Ver todas</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNewsData.map((article) => (
            <article 
              key={article.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300"
            >
              <Link href="#">
                <div className={`w-full h-48 ${article.image} opacity-80`}></div>
                <div className="p-5">
                  <span className={`text-xs font-semibold ${article.categoryColor}`}>{article.category}</span>
                  <h3 className="mt-2 text-xl font-playfair font-bold text-[#1d3557] leading-tight">{article.title}</h3>
                  <p className="mt-3 text-gray-600 line-clamp-3">{article.excerpt}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Por {article.author}</span>
                    <span className="text-sm text-gray-500">{article.timeAgo}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
