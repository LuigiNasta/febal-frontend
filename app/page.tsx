import AboutUs from "./components/AboutUs";
import PromoSection from "./components/PromoSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <section className="relative w-full h-screen">
        <Hero />
      </section>

      <main className="bg-white">
        <PromoSection />
        <AboutUs />
        <Footer />
      </main>
    </>
  );
}