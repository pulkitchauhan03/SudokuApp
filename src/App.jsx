import { useEffect, useState } from "react";
import "./App.css";

const problem = [
  [0, 0, 0, 0, 6, 0, 0, 0, 0],
  [1, 0, 0, 0, 5, 7, 0, 8, 9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 0, 3, 7, 5, 0, 0, 6],
  [3, 6, 0, 8, 9, 0, 4, 0, 0],
  [0, 9, 0, 0, 0, 0, 0, 5, 0],
  [5, 0, 1, 7, 4, 2, 9, 0, 8],
  [0, 4, 0, 0, 8, 6, 0, 3, 1],
  [0, 0, 0, 0, 1, 0, 7, 2, 4],
];

const initSolution = [
  [0, 0, 0, 0, 6, 0, 0, 0, 0],
  [1, 0, 0, 0, 5, 7, 0, 8, 9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 0, 3, 7, 5, 0, 0, 6],
  [3, 6, 0, 8, 9, 0, 4, 0, 0],
  [0, 9, 0, 0, 0, 0, 0, 5, 0],
  [5, 0, 1, 7, 4, 2, 9, 0, 8],
  [0, 4, 0, 0, 8, 6, 0, 3, 1],
  [0, 0, 0, 0, 1, 0, 7, 2, 4],
];

const numRows = 9;

function Cell({
  containerId,
  solution,
  cellId,
  handleCellChange,
  collisions,
  setCollisions,
}) {
  const row =
    parseInt((containerId / 3).toString().split(".")[0]) * 3 +
    parseInt((cellId / 3).toString().split(".")[0]);
  const col = (containerId % 3) * 3 + (cellId % 3);
  const cellProblemValue = problem[row][col];

  const checkValid = () => {
    let errArray = [];

    for (let i = 0; i < numRows; i++) {
      if (i !== row && solution[i][col] === solution[row][col])
        errArray.push({ row: i, col: col });
    }

    for (let i = 0; i < numRows; i++) {
      if (i !== col && solution[row][i] === solution[row][col])
        errArray.push({ row: row, col: i });
    }

    const subContainerRow = parseInt((row / 3).toString().split(".")[0]) * 3;
    const subContainerCol = parseInt((col / 3).toString().split(".")[0]) * 3;

    for (let i = subContainerRow; i < subContainerRow + 3; i++) {
      for (let j = subContainerCol; j < subContainerCol + 3; j++) {
        if ((i !== row || j !== col) && solution[i][j] === solution[row][col])
          errArray.push({ row: i, col: j });
      }
    }

    return errArray;
  };

  const updateValid = (setErrors) => {
    const local = [...collisions];

    if (solution[row][col] === 0) {
      local[row][col] = [];
    } else {
      const errArray = checkValid();
      console.log(errArray);

      if (errArray.length > 0) {
        const cellArr = [...local[row][col]];
        errArray.forEach((cell) => {
          if (setErrors) {
            const arr = [...local[cell.row][cell.col]];
            arr.push({ row: row, col: col });
            cellArr.push({ row: cell.row, col: cell.col });
            local[cell.row][cell.col] = [...arr];
          }
          else {
            const currCell = {row: row, col: col}

            const arr = local[cell.row][cell.col].filter((collision) => {
              return (collision.row !== currCell.row) || (collision.col !== currCell.col) ;
            });

            local[cell.row][cell.col] = arr;
          }
        });
        local[row][col] = [...cellArr];
      } else {
        local[row][col] = [];
      }
    }

    setCollisions(local);
  };

  return (
    <div className="h-full bg-black place-items-center">
      {cellProblemValue === 0 ? (
        <input
          className={`w-full h-full ${
            collisions[row][col].length === 0 ? "bg-black" : "bg-red-800"
          } focus:outline-offset-n3 focus:bg-white focus:text-black text-center caret-transparent cursor-pointer`}
          type="number"
          value={solution[row][col] === 0 ? "" : solution[row][col]}
          onChange={() => {}}
          onKeyDown={(event) => {
            updateValid(false);
            handleCellChange(event, row, col);
            updateValid(true);
          }}
        ></input>
      ) : (
        <div className="w-full h-full bg-zinc-700 content-center text-center flex flex-col justify-center">
          {cellProblemValue}
        </div>
      )}
    </div>
  );
}

function SubContainer({
  containerId,
  solution,
  handleCellChange,
  collisions,
  setCollisions,
}) {
  return (
    <div className="text-center text-white w-auto h-auto">
      <div className="grid grid-cols-3 h-full w-full gap-px">
        {Array(numRows)
          .fill()
          .map(function (v, i) {
            return (
              <Cell
                containerId={containerId}
                solution={solution}
                cellId={i}
                key={i}
                handleCellChange={handleCellChange}
                collisions={collisions}
                setCollisions={setCollisions}
              />
            );
          })}
      </div>
    </div>
  );
}

function App() {
  const [solution, setSolution] = useState(initSolution);
  const [collisions, setCollisions] = useState(
    Array(numRows)
      .fill()
      .map(() => Array(numRows).fill([]))
  );

  const handleCellChange = (event, row, col) => {
    const key = event.keyCode === 8 ? 0 : parseInt(event.key);

    if (key === 110) return;

    if (key >= 0 && key < 10) {
      const sol = [...solution];
      sol[row][col] = key;
      setSolution(sol);
    }
  };

  return (
    <div className=" grid w-screen h-screen place-items-center">
      <div className="grid grid-cols-3 bg-white gap-1 w-144 h-144 p-1">
        {Array(numRows)
          .fill()
          .map(function (v, i) {
            return (
              <SubContainer
                containerId={i}
                key={i}
                solution={solution}
                setSolution={setSolution}
                handleCellChange={handleCellChange}
                collisions={collisions}
                setCollisions={setCollisions}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
