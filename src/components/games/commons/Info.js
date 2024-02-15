import { FaInfoCircle } from 'react-icons/fa';
import { useState } from 'react';

const infoStyle = {
  position: 'absolute',
  right: '-20px',
  top: 0,
  cursor: 'pointer',
};

const modalStyle = {
  position: 'absolute',
  width: '150px',
  top: '-4px',
  right: '10px',
  borderRadius: '10px',
  border: '2px solid #8d8776',
  backgroundColor: 'rgb(18, 19, 24)',
  lineHeight: '50%',
  padding: '0.5rem',
  zIndex: '10',
};

const textStyle = {
  fontSize: '0.5rem',
};

const Info = ({ text }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <>
      {isHover && (
        <div style={modalStyle}>
          <span style={textStyle}>{text}</span>
        </div>
      )}
      <div
        style={infoStyle}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        <FaInfoCircle size={14} />
      </div>
    </>
  );
};

export default Info;
