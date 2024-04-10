import './lightsOut.scss';
import { useState, useEffect, useCallback } from 'react';
import ResetButton from '../commons/ResetButton';
import Board from '../commons/Board';
import { motion } from 'framer-motion';
import Info from '../commons/Info';

const gridSize = 5;
const minMoves = 5;

const infoText = {
  name: 'Lights Out',
  text: 'Whenever you click on a cell, the cell itself and all its orthogonal neighbors switch their states (lights on or off). Try to turn the whole board off.',
};

const LightsOut = () => {
  const [gridArr, setGridArr] = useState(
    new Array(gridSize).fill().map(() => new Array(gridSize).fill(false))
  );

  const [gameOver, setGameOver] = useState(false);

  const switchCell = useCallback((x, y) => {
    setGridArr((prev) => {
      const arr = [...prev];
      arr[x] = [...arr[x]];
      arr[x][y] = !arr[x][y];
      if (x > 0) {
        arr[x - 1] = [...arr[x - 1]];
        arr[x - 1][y] = !arr[x - 1][y];
      }
      if (x < gridSize - 1) {
        arr[x + 1] = [...arr[x + 1]];
        arr[x + 1][y] = !arr[x + 1][y];
      }
      if (y > 0) {
        arr[x][y - 1] = !arr[x][y - 1];
      }
      if (y < gridSize - 1) {
        arr[x][y + 1] = !arr[x][y + 1];
      }
      return arr;
    });
  }, []);

  const resetBoard = useCallback(() => {
    setGridArr(
      [...Array(gridSize)].fill().map(() => [...Array(gridSize)].fill(false))
    ); // gridSize x gridSize 2d array filled with false.
    let usedCells = [];
    for (let i = 0; i < minMoves; i++) {
      let canSwitch = true;
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * gridSize);
      for (let j = 0; j < usedCells.length; j++) {
        if (x === usedCells[j][0] && y === usedCells[j][1]) {
          //already used this cell.
          i--;
          canSwitch = false;
          break;
        }
      }
      if (canSwitch || usedCells.length === 0) {
        switchCell(x, y);
        usedCells.push([x, y]);
      }
    }
  }, [switchCell]);

  useEffect(() => {
    resetBoard();
  }, [resetBoard]);

  useEffect(() => {
    const isBoardClear = gridArr.every((x) => x.every((y) => y === false));
    setGameOver(isBoardClear);
  }, [gridArr]);

  return (
    <Board gameOver={gameOver}>
      <Info text={infoText} />
      <ResetButton reset={resetBoard} />

      {gridArr.map((ex, x) => {
        return (
          <div
            className="lights-row"
            key={x}
            style={{ height: 275 / gridSize }}
          >
            {ex.map((ey, y) => {
              return (
                <motion.div
                  className="lights-cell"
                  key={`${x}${y}`}
                  onClick={() => (gameOver ? null : switchCell(x, y))}
                  style={{
                    width: 275 / gridSize,
                    height: '100%',
                    border: ey ? '2px solid transparent' : '2px solid #8d8776',
                  }}
                  animate={{
                    backgroundColor: ey
                      ? 'rgba(140, 155, 210)'
                      : 'rgba(18, 19, 24)',
                    transition: { duration: 0.3 },
                  }}
                ></motion.div>
              );
            })}
          </div>
        );
      })}
    </Board>
  );
};

export default LightsOut;
