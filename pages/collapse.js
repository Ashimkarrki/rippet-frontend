import React, { useState } from "react";

const Collapse = () => {
  const [close, setClose] = useState(false);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <ul>
        <li>as</li>
        <li>fs</li>
        <li
          onClick={() => {
            setClose(!close);
          }}
        >
          sub
          <ul
            style={
              !close
                ? {
                    height: "0",
                    transform: "scaleY(0)",
                  }
                : {
                    height: "100%",
                    transformOrigin: "top",
                    transform: "scaleY(1)",

                    transition: "transform 200ms ease-in-out",
                  }
            }
          >
            <li>we</li>
            <li>as</li>
            <li>sfg</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Collapse;
