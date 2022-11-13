import React, { useState } from "react";
import SubContainer from "./SubContainer";

export default function SudokuGrid({ problem }) {
  const [solution, setSolution] = useState(problem.map(a => a.slice()));
  const [collisions, setCollisions] = useState(
    Array(problem.length)
      .fill()
      .map(() => Array(problem.length).fill([]))
  );

  const numRows = problem.length;
  
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
    <div className="grid w-screen h-screen place-items-center">
      <h1>Sudoku</h1>
      <div className="grid grid-cols-3 bg-zinc-300 gap-0.75 p-0.75 w-96 h-96 sm:w-144 sm:h-144 sm:gap-1 sm:p-1">
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
                problem={problem}
              />
            );
          })}
      </div>
    </div>
  );
}
