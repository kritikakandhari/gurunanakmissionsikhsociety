import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ScrollRevealText from "@/components/ScrollRevealText";
import AboutGuruji from "@/components/AboutGuruji";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Scroll Reveal Section */}
      <section className="py-14 md:py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <ScrollRevealText 
            text="Janamsthan Gurunanak Sahib." 
            className="text-3xl sm:text-4xl md:text-6xl font-bold leading-snug md:leading-tight text-center"
          />
        </div>
      </section>

      {/* Guru Nanak Dev Ji Teachings & Image Section */}
      <AboutGuruji />

      {/* Short welcome section on home page */}
      <section className="py-24 px-4 text-center bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Welcome to Gurdwara Guru Nanak Mission</h2>
          <div className="w-20 h-1 bg-blue-400 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed font-light">
            Our Gurdwara is a place of peace, devotion, and community service. We welcome everyone to join our daily Kirtan, Sangat, and Langar Seva. Explore our services and teachings to learn more about the Sikh way of life.
          </p>
          <a href="/about" className="inline-block bg-white text-blue-900 font-semibold px-8 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl">
            Learn More About Us
          </a>
        </div>
      </section>

      <Reviews />

      <Footer />
    </main>
  );
}
