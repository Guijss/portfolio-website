import Backdrop from './backdrop/Backdrop';
import './hero.scss';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const heroVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const leftToRightVariants = {
  initial: {
    opacity: 0,
    x: -200,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: '200',
      damping: '20',
    },
  },
};

const bottomToUpVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: '200',
      damping: '20',
    },
  },
};

const Hero = () => {
  const ref = useRef(null);
  return (
    <div className="hero" ref={ref}>
      <Backdrop heroRef={ref} />
      <motion.div
        className="hero-content"
        variants={heroVariants}
        animate="animate"
        initial="initial"
      >
        <motion.span variants={leftToRightVariants}>
          Hello, my name is
        </motion.span>
        <motion.h1 variants={leftToRightVariants}>Gui Silva</motion.h1>
        <motion.h2 variants={leftToRightVariants}>
          Front-end React developer
        </motion.h2>
        <motion.p variants={bottomToUpVariants}>
          I am based in Seattle, WA and I enjoy making cool things for the web.
          I build functional fun websites and aplications. Make sure to take a
          look at my projects!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Hero;
