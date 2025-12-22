import AboutUs from "./components/AboutUs";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
    <head> 
      <meta name="google-site-verification" content="Khef-5-VkzmO4BMvbSOejIU9z9LHwskan8lFB2tflAw" />
     </head>
      <Header />
      <section className="relative w-full h-screen">
        <Hero />
      </section>

      <main className="bg-white">
        <Categories />
        <AboutUs />
        <Footer />
      </main>
    </>
  );
}
