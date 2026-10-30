import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Services from '../sections/Services.jsx';
import Projects from '../sections/Projects.jsx';
import Skills from '../sections/Skills.jsx';
import Experience from '../sections/Experience.jsx';
import Proof from '../sections/Proof.jsx';
import Contact from '../sections/Contact.jsx';

// The 3D camera stops at: home, services, work, skills, experience, proof, contact.
// (About sits between home and services without its own stop.)
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Experience />
      <Proof />
      <Contact />
    </>
  );
}