import React, { useState } from "react";
import SubContainer from "./SubContainer";

export default function SudokuGrid({ problem }) {
  const [instructionFlag, setInstructionFlag] = useState(false);
  const [solution, setSolution] = useState(problem.map((a) => a.slice()));
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
    <div className="flex flex-col w-screen h-[100dvh] place-items-center">
      <h1 className="py-4 text-2xl font-semibold align-center tracking-wide">
        SUDOKU{" "}
        <i className="group fa fa-info-circle text-base relative align-text-top leading-8">
          <div className="group-hover:visible group-hover:opacity-100 invisible absolute sm:w-[512px] w-96 bg-white text-black z-10 opacity-0 transition-all duration-300 px-3 py-2 sm:-left-[256px] -left-48 rounded-md ">
            <div className="text-center">Instructions</div>
            <div>
              • You can use only numbers from 1 to 9
            </div>
            <div>• Each 3×3 block can only contain numbers from 1 to 9</div>
            <div>
              • Each vertical column can only contain numbers from 1 to 9
            </div>
            <div>
              • Each horizontal row can only contain numbers from 1 to 9
            </div>
            <div>
              • Each number in the 3×3 block, vertical column or horizontal row
              can be used only once
            </div>
            <div>
              • The game is over when the whole Sudoku grid is correctly filled
              with numbers
            </div>
          </div>
        </i>
      </h1>

      <div className="w-full relative h-[100dvh] justify-center py-32">
        <div className="grid grid-cols-3 mx-auto bg-zinc-300 gap-0.75 p-0.75 w-96 h-96 sm:w-144 sm:h-144 sm:gap-1 sm:p-1">
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
    </div>
  );
}
