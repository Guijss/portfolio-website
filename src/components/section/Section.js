import './section.scss';
import { motion } from 'framer-motion';

const titleVariants = {
  initial: {},
  animate: {
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      staggerChildren: 0.5,
    },
  },
};

const titleItemVariants = {
  initial: (dir) => ({
    opacity: 0,
    x: dir * 300,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

const Section = ({ flexDirection, title, children }) => {
  return (
    <div className="section" style={{ flexDirection: flexDirection }}>
      <motion.div
        className="title"
        variants={titleVariants}
        whileInView="animate"
        initial="initial"
        style={{ flexDirection: flexDirection }}
      >
        <motion.h1
          variants={titleItemVariants}
          custom={flexDirection === 'row' ? -1 : 1}
        >
          {title}
        </motion.h1>
        <motion.div
          variants={titleItemVariants}
          custom={flexDirection === 'row' ? -1 : 1}
          className="line"
        ></motion.div>
      </motion.div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Section;
