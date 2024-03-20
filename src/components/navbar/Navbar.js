import './navbar.scss';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Logo from './Logo';

const navigationVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const navitemVariants = {
  initial: {
    opacity: 0.1,
    y: -50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
    },
  },
};

const arr = ['Home', 'About', 'Projects', 'Contact'];

const Navbar = ({ refArr }) => {
  const { scrollY } = useScroll(0);

  const [selectedSection, setSelectedSection] = useState('Home');
  const [sliderPos, setSliderPos] = useState(10);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const about = refArr[1].ref.current;
    const projects = refArr[2].ref.current;
    const contact = refArr[3].ref.current;

    if (latest >= contact.offsetTop - 10) {
      setSelectedSection('Contact');
      setSliderPos(80 * 3 + 10);
      return;
    }
    if (latest >= projects.offsetTop - 10) {
      setSelectedSection('Projects');
      setSliderPos(80 * 2 + 10);
      return;
    }
    if (latest >= about.offsetTop - 10) {
      setSelectedSection('About');
      setSliderPos(80 * 1 + 10);
      return;
    }
    setSelectedSection('Home');
    setSliderPos(10);
  });

  return (
    <motion.div
      className="navbar"
      // animate={{
      //   height: selectedSection === 'Home' ? '40px' : '30px',
      // }}
    >
      <div className="logo">
        <Logo />
      </div>
      <div className="wrapper">
        <motion.div
          className="navigation"
          variants={navigationVariants}
          initial="initial"
          animate="animate"
        >
          {arr.map((el, i) => (
            <motion.div key={i} className="nav-item" variants={navitemVariants}>
              <a href={`#${el}`}>{el}</a>
            </motion.div>
          ))}
          <motion.div
            className="slider-bar"
            animate={{
              x: sliderPos,
              transition: { duration: 0.2 },
            }}
          ></motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Navbar;
