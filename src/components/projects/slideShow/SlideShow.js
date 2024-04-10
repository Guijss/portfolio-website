import './slideShow.scss';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Project from './Project';
import crossImg from '../../../assets/cross-constructor.png';
import cor from '../../../assets/cor.png';
import worldCup from '../../../assets/worldcup.png';
import creative from '../../../assets/creative.png';

const slides = [
  {
    id: 0,
    offset: 0,
    project: {
      img: crossImg,
      imgDir: 1,
      title: 'Cross Constructor',
      text: 'A web app that lets you make your own crossword puzzles. You can pick a grid size of either 15x15 or 21x21, choose your grid design, and then start adding words and their respective clues.',
      techs: ['React', 'Framer Motion', 'Scss'],
      url: 'https://guijss.github.io/cross-constructor/',
    },
  },
  {
    id: 1,
    offset: 100,
    project: {
      img: cor,
      imgDir: -1,
      title: 'Cor',
      text: 'A web app designed to aid users in generating color themes effortlessly. Begin by selecting a main color, and the app will provide you with complementary color suggestions, creating a harmonious color scheme tailored to your choice.',
      techs: ['React', 'Styled Components', 'Framer Motion'],
      url: 'https://guijss.github.io/cor/',
    },
  },
  {
    id: 2,
    offset: 200,
    project: {
      img: worldCup,
      imgDir: 1,
      title: 'World Cup Tracker',
      text: 'A tracker designed for users to follow or predict the outcomes of the 2022 FIFA World Cup. This app will receive updates for upcoming World Cups.',
      techs: ['React', 'Styled Components', 'React Router'],
      url: 'https://guijss.github.io/worldCupTracker/',
    },
  },
  {
    id: 3,
    offset: 300,
    project: {
      img: creative,
      imgDir: -1,
      title: 'Creative Coding',
      text: 'Explore a compilation of my creative coding projects developed over the years. Each project, predominantly crafted with p5.js, a library built upon the canvas API.',
      techs: ['React', 'P5js', 'React Router'],
      url: 'https://guijss.github.io/my-sketches/',
    },
  },
];

const buttonVariants = {
  initial: { color: '#f4ebd0' },
  hover: {
    color: 'rgb(140, 155, 210)',
    scale: 1.1,
    transition: { duration: 0.5 },
  },
  tap: { scale: 0.9, transition: { duration: 0.1 } },
};

const SlideShow = () => {
  const [inViewElemente, setInViewElemente] = useState(0);

  const handleSlide = (dir) => {
    setInViewElemente((prev) => {
      if (prev + dir < 0) {
        return slides.length - 1;
      } else if (prev + dir > slides.length - 1) {
        return 0;
      }
      return prev + dir;
    });
  };

  return (
    <>
      {slides.map((e) => (
        <motion.div
          key={e.id}
          className="slide"
          initial={false}
          animate={{ x: `${e.offset - slides[inViewElemente].offset}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <Project project={e.project} />
        </motion.div>
      ))}
      <motion.div className="button-container" initial="initial">
        <motion.div
          className="button"
          style={{ left: '1rem' }}
          onClick={() => handleSlide(-1)}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaAngleLeft size={40} />
        </motion.div>
        <motion.div
          className="button"
          style={{ right: '1rem' }}
          onClick={() => handleSlide(1)}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaAngleRight size={40} />
        </motion.div>
      </motion.div>
      <div className="slider-centerer">
        <div className="slider-container">
          {slides.map((e, i) => (
            <motion.div
              className="slider"
              key={e.id}
              onClick={() => setInViewElemente(i)}
              animate={{
                backgroundColor:
                  inViewElemente === i ? 'rgb(140, 155, 210)' : '#f4ebd0',
              }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SlideShow;
