import './backdrop.scss';
import { useState, useEffect, useRef } from 'react';

const rows = 9;
const cols = 16;

const Backdrop = ({ heroRef }) => {
  const ref = useRef(null);
  const [backdropSize, setBackdropSize] = useState({ x: 0, y: 0 });
  const [cellSize, setCellSize] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const cellColor = (x, y) => {
    const normalizedX = (255 / cols) * x;
    const normalizedY = (255 / rows) * y;
    const normalizedMousePos = {
      x: Math.floor(mousePos.x / cellSize.x),
      y: Math.floor((mousePos.y - 40) / cellSize.y),
    };
    const r = 255 - normalizedX;
    const g = 255 - normalizedY;
    const b = normalizedX;
    const maxDistSq = cols * cols; //cols * cols + rows * rows;

    const distSq =
      (normalizedMousePos.x - x) * (normalizedMousePos.x - x) +
      (normalizedMousePos.y - y) * (normalizedMousePos.y - y);
    const a = Math.max((1 - distSq / maxDistSq) * 0.2, 0.01);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     setMousePos({ x: event.clientX, y: event.clientY });
  //   };

  //   const handleResize = () => {
  //     setBackdropSize({ x: localRef.clientWidth, y: localRef.clientHeight });
  //     setCellSize({
  //       x: localRef.clientWidth / cols,
  //       y: localRef.clientHeight / rows,
  //     });
  //   };

  //   let localHeroRef = null;
  //   if (heroRef.current) {
  //     localHeroRef = heroRef.current;
  //   }
  //   //mouse position stuff.
  //   localHeroRef.addEventListener('mousemove', handleMouseMove);

  //   let localRef = null;
  //   if (ref.current) {
  //     localRef = ref.current;
  //   }
  //   //calculating grid sizes.
  //   window.addEventListener('resize', handleResize);
  //   handleResize();

  //   return () => {
  //     localHeroRef.removeEventListener('mousemove', handleMouseMove);
  //     localRef.removeEventListener('resize', handleResize);
  //   };
  // }, [heroRef]);

  return (
    <div className="backdrop" ref={ref}>
      <div className="hero-grid">
        {[...Array(rows)].map((e, y) => {
          return (
            <div
              className="hero-row"
              key={y}
              style={{ height: backdropSize.y / rows - 4 }}
            >
              {[...Array(cols)].map((e, x) => {
                return (
                  <div
                    className="hero-cell"
                    key={`${x}${y}`}
                    style={{
                      width: backdropSize.x / cols - 4,
                      backgroundColor: cellColor(x, y),
                    }}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Backdrop;
