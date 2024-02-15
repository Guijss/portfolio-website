import './fifteenSlide.scss';
import ResetButton from '../commons/ResetButton';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Board from '../commons/Board';

const gridSize = 4;
const minMoves = 50;

const FifteenSlide = () => {
  const [openCell, setOpenCell] = useState(gridSize * gridSize - 1);
  const [gridArr, setGridArr] = useState([
    ...Array(gridSize * gridSize).keys(),
  ]);

  const [gameOver, setGameOver] = useState(false);

  const switchCell = useCallback(
    (i) => {
      //check if its a neighbor. return if not.
      const cellX = i % gridSize;
      const cellY = Math.floor(i / gridSize);
      const openX = openCell % gridSize;
      const openY = Math.floor(openCell / gridSize);
      if (Math.abs(cellX - openX) + Math.abs(cellY - openY) > 1) {
        //not neighbor.
        return;
      }

      setGridArr((prev) => {
        let arr = [...prev];
        const temp = arr[i];
        arr[i] = arr[openCell];
        arr[openCell] = temp;
        setOpenCell(i);
        return arr;
      });
    },
    [openCell]
  );

  const resetBoard = useCallback(() => {
    const neighbors = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    let newBoard = [...Array(gridSize * gridSize).keys()];
    let newOpenCell = gridSize * gridSize - 1;
    setGridArr(() => {
      for (let i = 0; i < minMoves; i++) {
        let index = -1;
        while (index > gridSize * gridSize - 1 || index < 0) {
          const openX = newOpenCell % gridSize;
          const openY = Math.floor(newOpenCell / gridSize);
          const pick = neighbors[Math.floor(Math.random() * 4)];
          const cellX = openX + pick[0];
          const cellY = openY + pick[1];
          index = cellY * gridSize + cellX;
        }
        const temp = newBoard[index];
        newBoard[index] = newBoard[newOpenCell];
        newBoard[newOpenCell] = temp;
        newOpenCell = index;
      }
      setOpenCell(newOpenCell);
      return newBoard;
    });
  }, []);

  useEffect(() => {
    resetBoard();
  }, [resetBoard]);

  useEffect(() => {
    const isBoardClear = () => {
      for (let i = 0; i < gridSize * gridSize; i++) {
        if (gridArr[i] !== i) {
          return false;
        }
      }
      return true;
    };
    setGameOver(isBoardClear);
  }, [gridArr]);

  return (
    <Board gameOver={gameOver}>
      <ResetButton reset={resetBoard} />
      {/* <div className="slide-grid"> */}
      {gridArr.map((e, i) => (
        <motion.div
          className="slide-cell"
          onClick={() => (gameOver ? null : switchCell(i))}
          key={e}
          style={{
            color: e !== 15 ? '#f4ebd0' : 'transparent',
            border: e !== 15 ? '2px solid #8d8776' : '2px solid transparent',
          }}
          layout
          initial={{
            scale: 1,
            backgroundColor: e !== 15 ? 'rgb(18, 19, 24)' : 'transparent',
          }}
          whileHover={{
            scale: gameOver ? 1 : 1.1,
            transition: { type: 'spring' },
          }}
          animate={{
            backgroundColor:
              e === 15
                ? 'transparent'
                : gameOver
                ? 'rgb(140, 155, 210)'
                : 'rgb(18, 19, 24)',
            transition: {
              duration: gameOver ? 0.5 : 0,
              repeat: gameOver ? 1 : 0,
              repeatType: 'mirror',
              delay: e * 0.05 + 0.5,
            },
          }}
          transition={{ type: 'spring', bounce: 0.35, duration: 0.3 }}
        >
          {e + 1}
        </motion.div>
      ))}
      {/* </div> */}
    </Board>
  );
};

export default FifteenSlide;
