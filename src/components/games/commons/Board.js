import { motion } from 'framer-motion';

const boardStyle = {
  position: 'relative',
  width: '300px',
  minWidth: '300px',
  backgroundColor: 'rgb(18, 19, 24)',
  aspectRatio: '1/1',
  borderRadius: '10px',
  border: '5px solid #8d8776',
};

const Board = ({ children, gameOver }) => {
  return (
    <motion.div
      style={{
        ...boardStyle,
        border: gameOver ? '5px solid rgb(140, 155, 210)' : '5px solid #8d8776',
      }}
      animate={
        gameOver
          ? { boxShadow: '0px 0px 15px 0px rgba(140, 155, 210, 0.50)' }
          : null
      }
      transition={{
        repeat: gameOver ? Infinity : 0,
        repeatType: 'mirror',
        duration: 1,
        ease: 'easeInOut',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignContent: 'space-evenly',
          flexWrap: 'wrap',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Board;
