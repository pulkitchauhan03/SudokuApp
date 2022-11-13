import axios from "axios";
import { useEffect, useState } from "react";
import LoadingIcon from "./components/loadingIcon";
import SudokuGrid from "./SudokuGrid";

const numRows = 9;

const options = {
  params: { diff: "2", stype: "list", solu: "false" },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
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
      .get("https://sudoku-board.p.rapidapi.com/new-board", options)
      .then((response) => {
        const prob = response.data.response;
        console.log(prob["unsolved-sudoku"]);
        setProblem(prob["unsolved-sudoku"]);
        setReady(true);
      });
  }, []);

  return <>{isReady ? <SudokuGrid problem={problem} /> : <LoadingIcon />}</>;
}

export default App;
