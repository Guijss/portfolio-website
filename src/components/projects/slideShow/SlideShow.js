import './slideShow.scss';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Project from './Project';

const slides = [
  {
    id: 0,
    offset: 0,
    project: {
      img: '',
      title: 'Cross Constructor',
      text: '',
      techs: ['React', 'Styled Components', 'Framer Motion'],
    },
  },
  {
    id: 1,
    offset: 100,
    project: {
      img: '',
      title: 'Cor',
      text: '',
      techs: ['React', 'Framer Motion', 'scss'],
    },
  },
  {
    id: 2,
    offset: 200,
    project: {
      img: '',
      title: 'Creative Coding',
      text: '',
      techs: ['React', 'P5js', 'React Router'],
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
