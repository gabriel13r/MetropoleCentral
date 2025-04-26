import { Link } from "wouter";

type CategoryArticle = {
  title: string;
  link: string;
};

type Category = {
  id: number;
  title: string;
  borderColor: string;
  bgColor: string;
  mainArticle: {
    title: string;
    excerpt: string;
  };
  articles: CategoryArticle[];
};

const categories: Category[] = [
  {
    id: 1,
    title: "Economia",
    borderColor: "border-[#457b9d]",
    bgColor: "bg-[#457b9d]",
    mainArticle: {
      title: "PIB cresce acima das expectativas no segundo trimestre",
      excerpt: "Resultado surpreende analistas e pode levar a revisões das projeções para o ano."
    },
    articles: [
      { title: "Inflação registra queda pelo terceiro mês consecutivo", link: "#" },
      { title: "Desemprego atinge menor nível dos últimos cinco anos", link: "#" },
      { title: "Exportações batem recorde no primeiro semestre", link: "#" }
    ]
  },
  {
    id: 2,
    title: "Internacional",
    borderColor: "border-[#e63946]",
    bgColor: "bg-[#e63946]",
    mainArticle: {
      title: "Cúpula do G20 termina com acordo sobre mudanças climáticas",
      excerpt: "Países se comprometem com metas mais ambiciosas de redução de emissões até 2030."
    },
    articles: [
      { title: "Tensões entre potências aumentam no Mar do Sul da China", link: "#" },
      { title: "Eleições na Europa mostram avanço de partidos de centro", link: "#" },
      { title: "ONU alerta para crise humanitária em zona de conflito", link: "#" }
    ]
  },
  {
    id: 3,
    title: "Tecnologia",
    borderColor: "border-[#a8dadc]",
    bgColor: "bg-[#a8dadc]",
    mainArticle: {
      title: "Nova regulamentação para inteligência artificial é aprovada",
      excerpt: "Legislação estabelece parâmetros éticos e de segurança para desenvolvimento de IA no país."
    },
    articles: [
      { title: "Startup brasileira recebe investimento bilionário", link: "#" },
      { title: "5G chega a mais 50 cidades brasileiras este mês", link: "#" },
      { title: "Cibersegurança: ataques a instituições aumentam 40%", link: "#" }
    ]
  }
];

const Categories = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.id}>
            <div className={`border-b-2 ${category.borderColor} pb-2 mb-6`}>
              <h2 className="text-xl font-playfair font-bold text-[#1d3557]">{category.title}</h2>
            </div>
            
            <div className="mb-6">
              <Link href="#" className="block">
                <div className={`w-full h-48 ${category.bgColor} opacity-70 rounded-lg mb-4`}></div>
                <h3 className="font-playfair font-bold text-lg">{category.mainArticle.title}</h3>
              </Link>
              <p className="mt-2 text-gray-600 text-sm">{category.mainArticle.excerpt}</p>
            </div>
            
            <ul className="space-y-4">
              {category.articles.map((article, index) => (
                <li key={index}>
                  <Link 
                    href={article.link} 
                    className="text-[#1d3557] hover:text-[#e63946] transition font-medium"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
