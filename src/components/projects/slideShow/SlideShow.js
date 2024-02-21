import './slideShow.scss';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const slides = [
  { id: 0, color: 'gray', offset: 0 },
  { id: 1, color: 'green', offset: 100 },
  { id: 2, color: 'blue', offset: 200 },
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

  const handleSlide = (index) => {
    setInViewElemente(Math.max(0, Math.min(index, slides.length - 1)));
  };

  return (
    <>
      {slides.map((e) => (
        <motion.div
          key={e.id}
          className="slide"
          //   style={{ backgroundColor: e.color }}
          initial={false}
          animate={{ x: `${e.offset - slides[inViewElemente].offset}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        ></motion.div>
      ))}
      <motion.div className="button-container" initial="initial">
        <motion.div
          className="button"
          style={{ left: '1rem' }}
          onClick={() => handleSlide(inViewElemente - 1)}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaAngleLeft size={40} />
        </motion.div>
        <motion.div
          className="button"
          style={{ right: '1rem' }}
          onClick={() => handleSlide(inViewElemente + 1)}
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
