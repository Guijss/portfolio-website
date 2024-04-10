import { FaInfoCircle } from 'react-icons/fa';
import { useState } from 'react';
import './info.scss';

const textStyle = {
  fontSize: '0.5rem',
};

const Info = ({ text }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <>
      {isHover && (
        <div className="modal">
          <div className="name">{text.name}</div>
          <div className="separator"></div>
          <div className="text">{text.text}</div>
        </div>
      )}
      <div
        className="info"
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        <FaInfoCircle size={25} />
      </div>
    </>
  );
};

export default Info;
