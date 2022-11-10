import "./App.css";

function Cell({ value }) {
  return (
    <div className="grid h-auto bg-black place-items-center">
      <input
        className="w-full h-full bg-black focus:outline-offset-n3 focus:bg-white focus:text-black text-center caret-transparent"
        type="number"
      ></input>
    </div>
  );
}

function SubContainer() {
  return (
    <div className="text-center text-white w-auto h-auto">
      <div className="grid grid-cols-3 h-full w-full gap-px">
        <Cell value="1" />
        <Cell value="2" />
        <Cell value="3" />
        <Cell value="4" />
        <Cell value="5" />
        <Cell value="6" />
        <Cell value="7" />
        <Cell value="8" />
        <Cell value="9" />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className=" grid w-screen h-screen place-items-center">
      <div className="grid grid-cols-3 bg-white gap-1 w-144 h-144 p-1">
        <SubContainer />
        <SubContainer />
        <SubContainer />
        <SubContainer />
        <SubContainer />
        <SubContainer />
        <SubContainer />
        <SubContainer />
        <SubContainer />
      </div>
    </div>
  );
}

export default App;
