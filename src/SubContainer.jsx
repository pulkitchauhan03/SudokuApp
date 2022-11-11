import React from "react";
import Cell from "./Cell";

export default function SubContainer({
  containerId,
  solution,
  handleCellChange,
  collisions,
  setCollisions,
  problem
}) {

  const numRows = problem.length;

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
                problem={problem}
              />
            );
          })}
      </div>
    </div>
  );
}
