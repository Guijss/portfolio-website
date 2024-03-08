import './backdrop.scss';
import { useState, useEffect, useRef } from 'react';

const cellSize = 50;
const animationInterval = 1;

const Backdrop = ({ heroRef }) => {
  const interval = useRef(null);
  const backdropRef = useRef(null);
  const gridRef = useRef(null);
  const isAnimating = useRef(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState({ cols: 0, rows: 0 });

  useEffect(() => {
    const localBackdropRef = backdropRef.current;
    const localGridRef = gridRef.current;
    const handleMouseMove = (event) => {
      setMousePos({
        x: event.clientX - localGridRef.offsetLeft,
        y: event.clientY - localGridRef.offsetTop - heroRef.current.offsetTop,
      });
    };

    const handleResize = () => {
      const cols = Math.floor(localBackdropRef.clientWidth / cellSize);
      const rows = Math.floor(localBackdropRef.clientHeight / cellSize);
      setGrid([...Array(cols * rows)].map((_, i) => (i === 0 ? 0 : 1)));
      setGridSize({ cols: cols, rows: rows });
    };

    //mouse position stuff.
    window.addEventListener('mousemove', handleMouseMove);

    //calculating grid sizes.
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [heroRef]);

  const handleMouseOver = () => {
    const localBackdropRef = backdropRef.current;
    interval.current = setInterval(() => {
      let emptyCell = 0;
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] === 0) {
          emptyCell = i;
          break;
        }
      }
      const cols = Math.floor(localBackdropRef.clientWidth / cellSize);
      const rows = Math.floor(localBackdropRef.clientHeight / cellSize);
      const emptyX = emptyCell % cols;
      const emptyY = Math.floor(emptyCell / rows);
      const mouseX = Math.floor(mousePos.x / cellSize);
      const mouseY = Math.floor(mousePos.y / cellSize);
      console.log(mousePos);
      // console.log(mouseX, mouseY);
    }, animationInterval * 1000);
  };

  const handleMouseOut = () => {
    clearInterval(interval.current);
  };

  return (
    <div className="backdrop" ref={backdropRef}>
      <div
        className="hero-grid"
        style={{
          width: gridSize.cols * cellSize,
          height: gridSize.rows * cellSize,
        }}
        ref={gridRef}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {grid.map((e, i) => (
          <div
            key={i}
            className={e === 0 ? 'empty-cell' : 'hero-cell'}
            style={{ width: cellSize, height: cellSize }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Backdrop;
