import './backdrop.scss';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const cellSize = 100;
const animationInterval = 1;

const Backdrop = ({ heroRef }) => {
  const interval = useRef(null);
  const backdropRef = useRef(null);
  const gridRef = useRef(null);
  //we don't need to rer-render eveytime the mouse moves, so we use useRef to store mousePos.
  const mousePos = useRef({ x: 0, y: 0 });

  // const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState({ cols: 0, rows: 0 });
  const [animationTick, setAnimationTick] = useState(0);

  useEffect(() => {
    const localBackdropRef = backdropRef.current;
    const localGridRef = gridRef.current;
    const handleMouseMove = (event) => {
      mousePos.current = {
        x: event.clientX - localGridRef.offsetLeft,
        y: event.clientY - localGridRef.offsetTop - heroRef.current.offsetTop,
      };
    };

    const handleResize = () => {
      const cols = Math.floor(localBackdropRef.clientWidth / cellSize);
      const rows = Math.floor(localBackdropRef.clientHeight / cellSize);
      setGrid(
        [...Array(cols * rows)].map((_, i) =>
          i === 0 ? { key: i, filled: false } : { key: i, filled: true }
        )
      );
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

  useEffect(() => {
    interval.current = setInterval(() => {
      setAnimationTick((prev) => prev + 1);
    }, 1000 * animationInterval);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    const localBackdropRef = backdropRef.current;
    setGrid((prev) => {
      const newGrid = [...prev];
      let emptyCell = 0;
      for (let i = 0; i < newGrid.length; i++) {
        if (newGrid[i].filled === false) {
          emptyCell = i;
          break;
        }
      }
      const cols = Math.floor(localBackdropRef.clientWidth / cellSize);
      const rows = Math.floor(localBackdropRef.clientHeight / cellSize);
      const emptyX = emptyCell % cols;
      const emptyY = Math.floor(emptyCell / cols);
      const mouseX = Math.floor(mousePos.current.x / cellSize);
      const mouseY = Math.floor(mousePos.current.y / cellSize);
      if (mouseX === emptyX && mouseY === emptyY) {
        //already there. don't need to move.
        return newGrid;
      }
      let candidateCells = [];
      if (mouseX > emptyX && emptyX < cols - 1) {
        candidateCells.push(emptyCell + 1);
      } else if (mouseX < emptyX && emptyX > 0) {
        candidateCells.push(emptyCell - 1);
      }
      if (mouseY > emptyY && emptyY < rows - 1) {
        candidateCells.push(emptyCell + cols);
      } else if (mouseY < emptyY && emptyY > 0) {
        candidateCells.push(emptyCell - cols);
      }
      if (candidateCells.length === 0) {
        return newGrid;
      }
      const pick =
        candidateCells[Math.floor(candidateCells.length * Math.random())];

      const temp = newGrid[pick];
      newGrid[pick] = newGrid[emptyCell];
      newGrid[emptyCell] = temp;

      return newGrid;
    });
  }, [animationTick]);

  return (
    <div className="backdrop" ref={backdropRef}>
      <div
        className="hero-grid"
        style={{
          width: gridSize.cols * cellSize,
          height: gridSize.rows * cellSize,
        }}
        ref={gridRef}
      >
        {grid.map((e, i) => (
          <motion.div
            key={e.key}
            className={e.filled === false ? 'empty-cell' : 'hero-cell'}
            style={{ width: cellSize, height: cellSize }}
            transition={{ duration: animationInterval, ease: 'anticipate' }}
            layout
          ></motion.div>
        ))}
      </div>
    </div>
  );
};

export default Backdrop;
