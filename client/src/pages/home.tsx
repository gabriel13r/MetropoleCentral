import Header from "@/components/header";
import HeroSection from "@/components/hero";
import LatestNews from "@/components/latest-news";
import OpinionSection from "@/components/opinion-section";
import Newsletter from "@/components/newsletter";
import Categories from "@/components/categories";
import Footer from "@/components/footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header />
      <main>
        <HeroSection />
        <LatestNews />
        <OpinionSection />
        <Newsletter />
        <Categories />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
