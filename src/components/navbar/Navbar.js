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

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const about = refArr[1].ref.current;
    const projects = refArr[2].ref.current;
    const contact = refArr[3].ref.current;

    if (latest >= contact.offsetTop - 10) {
      setSelectedSection('Contact');
      return;
    }
    if (latest >= projects.offsetTop - 10) {
      setSelectedSection('Projects');
      return;
    }
    if (latest >= about.offsetTop - 10) {
      setSelectedSection('About');
      return;
    }
    setSelectedSection('Home');
  });

  return (
    <motion.div
      className="navbar"
      animate={{
        height: selectedSection === 'Home' ? '40px' : '30px',
      }}
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
              <motion.div
                className="dot"
                animate={{ opacity: el === selectedSection ? 1 : 0 }}
                transition={{ type: 'tween', dutaion: 1 }}
              ></motion.div>
              <a href={`#${el}`}>{el}</a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Navbar;
