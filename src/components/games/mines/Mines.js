import Board from '../commons/Board';
import ResetButton from '../commons/ResetButton';
import Flag from './Flag';
import Mine from './Mine';
import Info from '../commons/Info';
import './mines.scss';
import { useState } from 'react';

const gridSize = 10;
const numMines = 12;

const cellStyle = (i, isRevealed) => {
  return {
    width: `${100 / gridSize}%`,
    borderTopLeftRadius: i === 0 ? '4px' : 0,
    borderTopRightRadius: i === gridSize - 1 ? '4px' : 0,
    borderBottomLeftRadius: i === gridSize * gridSize - gridSize ? '4px' : 0,
    borderBottomRightRadius: i === gridSize * gridSize - 1 ? '4px' : 0,
    border: isRevealed ? '1px solid #8d8776' : '1px solid rgb(18, 19, 24)',
    backgroundColor: isRevealed ? 'rgb(18, 19, 24)' : '#8d8776',
  };
};

const infoText = '';

const Mines = () => {
  const [gridArr, setGridArr] = useState([
    ...Array(gridSize * gridSize).fill({
      minesAround: 0,
      isRevealed: false,
      isFlag: false,
      isMine: false,
    }),
  ]);
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [gameOver, setGameOver] = useState(0); //-1: lost, 1: win, 0: playing.

  const handleClick = (event, i) => {
    event.preventDefault();
    if (gameOver !== 0) {
      return;
    }
    if (event.button === 0) {
      //left click
      if (isFirstMove) {
        setupBoard(i);
        setIsFirstMove(false);
      }
      setGridArr((prev) => {
        const arr = [...prev];
        const floodOpen = (index) => {
          arr[index] = { ...arr[index], isRevealed: true, isFlag: false };
          if (arr[index].minesAround === 0) {
            for (let x = -1; x < 2; x++) {
              for (let y = -1; y < 2; y++) {
                if (x === 0 && y === 0) {
                  continue;
                }
                const neighborX = index % gridSize;
                const neighborY = Math.floor(index / gridSize);
                const cellX = neighborX + x;
                const cellY = neighborY + y;
                if (
                  cellX < 0 ||
                  cellX > gridSize - 1 ||
                  cellY < 0 ||
                  cellY > gridSize - 1
                ) {
                  //out of bounds.
                  continue;
                }
                const neighborIndex = cellY * gridSize + cellX;
                if (arr[neighborIndex].isRevealed) {
                  continue;
                }
                floodOpen(neighborIndex);
              }
            }
          }
        };
        if (arr[i].isMine) {
          setGameOver(-1);
          //game lost. reveal every mine.
          arr.forEach((_, j) => {
            arr[j] = arr[j].isMine
              ? { ...arr[j], isRevealed: true, isFlag: false }
              : arr[j];
          });
        } else {
          floodOpen(i);
        }

        //check for win condition.
        if (arr.every((e) => e.isRevealed || e.isMine)) {
          setGameOver(1);
        }
        return arr;
      });
      return;
    }
    if (event.button === 2) {
      //right click
      setGridArr((prev) => {
        const arr = [...prev];
        arr[i] = { ...arr[i] };
        arr[i].isFlag = !arr[i].isFlag && !arr[i].isRevealed;
        return arr;
      });
      return;
    }
  };

  const setupBoard = (i) => {
    let randomSelectorArr = [...Array(gridArr.length).keys()];
    randomSelectorArr.splice(randomSelectorArr.indexOf(i), 1);
    randomSelectorArr.sort(() => 0.5 - Math.random());
    setGridArr((prev) => {
      const arr = [...prev];
      for (let i = 0; i < numMines; i++) {
        //setting up mines.
        const mineIndex = randomSelectorArr[i];
        arr[mineIndex] = { ...arr[mineIndex], isMine: true };
        //increasing minesAround number on neighbors.
        for (let x = -1; x < 2; x++) {
          for (let y = -1; y < 2; y++) {
            if (x === 0 && y === 0) {
              continue;
            }
            let index = -1;
            const mineX = mineIndex % gridSize;
            const mineY = Math.floor(mineIndex / gridSize);
            const cellX = mineX + x;
            const cellY = mineY + y;
            if (
              cellX < 0 ||
              cellX > gridSize - 1 ||
              cellY < 0 ||
              cellY > gridSize - 1
            ) {
              //out of bounds.
              continue;
            }
            index = cellY * gridSize + cellX;
            if (arr[index].isMine) {
              continue;
            }
            arr[index] = { ...arr[index] };
            arr[index].minesAround++;
          }
        }
      }
      return arr;
    });
  };

  const resetBoard = () => {
    setGridArr(() => {
      const arr = [
        ...Array(gridSize * gridSize).fill({
          minesAround: 0,
          isRevealed: false,
          isFlag: false,
          isMine: false,
        }),
      ];
      return arr;
    });
    setIsFirstMove(true);
    setGameOver(0);
  };

  return (
    <Board gameOver={gameOver === 1}>
      <Info text={infoText} />
      <ResetButton reset={resetBoard} />
      {gridArr.map((e, i) => (
        <div
          className="mines-cell"
          key={i}
          style={cellStyle(i, gridArr[i].isRevealed)}
          onClick={(event) => handleClick(event, i)}
          onContextMenu={(event) => handleClick(event, i)}
        >
          {gridArr[i].isFlag && <Flag />}
          {gridArr[i].isRevealed && gridArr[i].isMine && <Mine />}
          {gridArr[i].isRevealed && gridArr[i].minesAround > 0 && (
            <span>{gridArr[i].minesAround}</span>
          )}
        </div>
      ))}
    </Board>
  );
};

export default Mines;
