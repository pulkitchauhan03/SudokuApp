import axios from "axios";
import { useEffect, useState } from "react";
import LoadingIcon from "./components/loadingIcon";
import SudokuGrid from "./SudokuGrid";

const numRows = 9;

const options = {
  params: { diff: "2", stype: "list", solu: "false" },
  headers: {
    // "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
    "X-RapidAPI-Key": "4db8f58062mshdff98c82698e23dp141045jsnd0d1f5a58e0f",
    "X-RapidAPI-Host": "sudoku-board.p.rapidapi.com",
  },
};

function App() {
  const [problem, setProblem] = useState(
    Array(numRows)
      .fill()
      .map(() => Array(numRows).fill(0))
  );

  const [isReady, setReady] = useState(false);

  useEffect(() => {
    // console.log(options)
    axios
      .get("https://sugoku.onrender.com/board?difficulty=easy")
      .then((response) => {
        const prob = response.data.board;
        // console.log(prob);
        setProblem(prob);
        setReady(true);
      });
    // Problem Format
    // setProblem([
    //   [2, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 6, 2, 0, 0],
    //   [0, 0, 1, 0, 0, 0, 0, 7, 0],
    //   [0, 0, 6, 0, 0, 8, 0, 0, 0],
    //   [3, 0, 0, 0, 9, 0, 0, 0, 7],
    //   [0, 0, 0, 6, 0, 0, 4, 0, 0],
    //   [0, 4, 0, 0, 0, 0, 8, 0, 0],
    //   [0, 0, 5, 2, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 3],
    // ]);
  }, []);

  return <>{isReady ? <SudokuGrid problem={problem} /> : <LoadingIcon />}</>;
}

export default App;
