import './navbar.scss';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

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
    if (latest <= refArr[0].ref.current.offsetTop + 10) {
      setSelectedSection('Home');
    } else if (latest <= refArr[1].ref.current.offsetTop + 10) {
      setSelectedSection('About');
    } else if (latest <= refArr[2].ref.current.offsetTop + 10) {
      setSelectedSection('Projects');
    } else {
      setSelectedSection('Contact');
    }
  });

  return (
    <motion.div
      className="navbar"
      animate={{
        height: selectedSection === 'Home' ? '40px' : '30px',
        boxShadow:
          selectedSection !== 'Home'
            ? '0px 0px 10px 0px rgba(0, 0, 0, 0.75)'
            : '0px 0px 10px 0px rgba(0, 0, 0, 0)',
        backgroundColor:
          selectedSection === 'Home' ? 'rgb(18, 19, 24)' : 'rgb(17, 17, 22)',
      }}
    >
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
