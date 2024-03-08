import './cell.scss';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const Cell = ({ mousePos, cellSize }) => {
  const [angle, setAngle] = useState(0);
  const ref = useRef(null);
  const angleMultiplier = useRef(0);

  useEffect(() => {
    let ticking = false;

    const calcNewAngle = () => {
      const cellPos = {
        x: ref.current.offsetLeft + ref.current.clientWidth / 2,
        y: ref.current.offsetTop + ref.current.clientHeight / 2,
      };
      const angleVec = { x: mousePos.x - cellPos.x, y: mousePos.y - cellPos.y };
      const newAngle = (180 / Math.PI) * Math.atan2(angleVec.y, angleVec.x);

      setAngle((prev) => {
        const dAngle = newAngle - prev;
        const adAngle = Math.abs(dAngle);

        if (adAngle >= 270) {
          const cw = -Math.sign(dAngle) * Math.sign(mousePos.dY);
          return prev + cw * 360 + dAngle;
        }
        return prev + dAngle;
      });
      ticking = false;
    };

    if (ref.current === null) {
      return;
    }

    if (!ticking) {
      //we use this trick to limit the number of re-renders to once every frame.
      requestAnimationFrame(calcNewAngle);
      ticking = true;
    }
  }, [mousePos]);

  return (
    <div
      className="cell"
      style={{
        width: cellSize.x,
        height: cellSize.y,
      }}
      ref={ref}
    >
      <motion.div
        className="rotator"
        style={{ width: Math.min(cellSize.x, cellSize.y) }}
        animate={{ rotate: angle }}
      >
        <div className="circle"></div>
      </motion.div>
    </div>
  );
};

export default Cell;
