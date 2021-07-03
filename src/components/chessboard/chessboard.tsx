import React from "react";

import "./chessboard.css";
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const Chessboard = () => {
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      let tileKey = `${horizontalAxis[i]}${verticalAxis[j]}`;
      const isEven = (j + i + 2) % 2 === 0;
      board.push(
        <div
          key={tileKey}
          className={`${isEven ? "black-tile" : "white-tile"}`}
        >
          [{horizontalAxis[i]}
          {verticalAxis[j]}]
        </div>
      );
      console.log(tileKey);
    }
  }

  return <div id="chessboard">{board}</div>;
};

export default Chessboard;
