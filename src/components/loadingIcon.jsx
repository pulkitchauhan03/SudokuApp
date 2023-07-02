import React from "react";
import loadingLogo from "../assets/loading2.svg";

function Loader({ value, delay }) {
  return (
    <div
      className="animate-bounce inline-block"
      style={{ animationDelay: `${delay}ms` }}
    >
      {value}
    </div>
  );
}

export default function LoadingIcon() {
  const loading = "Loading...";

  return (
    <div className="relative w-screen h-screen flex place-items-center">
      <div className="m-auto">
        <img src={loadingLogo} alt="Loading" />
        <div className="text-center">
          {[...loading].map((v, i) => {
            return <Loader value={v} key={i} delay={20*i}/>
          })}
        </div>
      </div>
    </div>
  );
}