import { motion } from 'framer-motion';
import { TbReload } from 'react-icons/tb';

const buttomStyle = {
  position: 'absolute',
  width: 'calc(200px / 7)',
  right: 'calc(-200px / 5.5)',
  bottom: '-4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  aspectRatio: '1/1',
  borderRadius: '10px',
  border: '3px solid #8d8776',
  backgroundColor: 'rgb(18, 19, 24)',
  color: '#8d8776',
  cursor: 'pointer',
};

const ResetButton = ({ reset }) => {
  return (
    <motion.div
      className="reset-button"
      onClick={reset}
      style={buttomStyle}
      whileHover={{
        backgroundColor: '#8d8776',
        color: 'rgb(18, 19, 24)',
        scale: 1.1,
      }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="rotator"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        whileHover={{
          rotate: 360,
        }}
        transition={{ type: 'spring' }}
      >
        <TbReload style={{ width: '70%', height: '70%' }} />
      </motion.div>
    </motion.div>
  );
};

export default ResetButton;
