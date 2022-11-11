import React from "react";

export default function Cell({
  containerId,
  solution,
  cellId,
  handleCellChange,
  collisions,
  setCollisions,
  problem,
}) {
  const numRows = problem.length;

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
          } else {
            const currCell = { row: row, col: col };

            const arr = local[cell.row][cell.col].filter((collision) => {
              return (
                collision.row !== currCell.row || collision.col !== currCell.col
              );
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
            collisions[row][col].length === 0
              ? "bg-black hover:bg-white focus:bg-white hover:text-black focus:text-black outline-black focus:outline"
              : "bg-red-800 hover:bg-red-600 hover:text-white focus:text-white outline-white focus:outline"
          } transition-all focus:outline-offset-n3 text-center caret-transparent cursor-pointer border-0`}
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
        <div className="w-full h-full bg-zinc-700 content-center text-center flex flex-col justify-center select-none">
          {cellProblemValue}
        </div>
      )}
    </div>
  );
}
