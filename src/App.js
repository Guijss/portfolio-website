import { useRef, useEffect, useState } from 'react';
import './app.scss';
import Navbar from './components/navbar/Navbar';
import Projects from './components/projects/Projects';
import Section from './components/section/Section';
import Hero from './components/hero/Hero';
import About from './components/about/About';

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const [refArr, setRefArr] = useState([
    { ref: homeRef, name: 'Home' },
    { ref: aboutRef, name: 'About' },
    { ref: projectsRef, name: 'Projects' },
    { ref: contactRef, name: 'Contact' },
  ]);

  useEffect(() => {
    setRefArr([
      { ref: homeRef, name: 'Home' },
      { ref: aboutRef, name: 'About' },
      { ref: projectsRef, name: 'Projects' },
      { ref: contactRef, name: 'Contact' },
    ]);
  }, [homeRef, aboutRef, projectsRef, contactRef]);

  return (
    <div>
      <Navbar refArr={refArr} />
      <section id="Home" ref={homeRef}>
        <Hero />
      </section>
      <section id="About" ref={aboutRef}>
        <Section flexDirection="row" title="About Me">
          <About />
        </Section>
      </section>
      <section id="Projects" ref={projectsRef}>
        <Section flexDirection="row-reverse" title="Projects">
          <Projects />
        </Section>
      </section>
      <section id="Contact" ref={contactRef}>
        <Section flexDirection="row" title="Get In Touch!" />
      </section>
    </div>
  );
}

export default App;
