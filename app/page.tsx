import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/nav-bar/Navbar";
import About from "@/components/sections/about/About";
import Contact from "@/components/sections/contact/Contact";
import Hero from "@/components/sections/hero/Hero";
import Skills from "@/components/sections/skills/Skills";
import Works from "@/components/sections/works/Works";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Works />
        <Skills />
        <Contact>
          <Footer />
        </Contact>
      </main>
    </>
  );
}
