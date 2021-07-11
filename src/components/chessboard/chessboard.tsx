import React, { useState, useEffect, useRef } from "react";
import Tile from "../tiles/tile.component";
import Referee from "../referee/referee";
import { setupBoard } from "./setupBoard";
import { Piece } from "./piece";
import "./chessboard.css";
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

const Chessboard = () => {
  let board = [];
  const chessboardRef = useRef<HTMLDivElement>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState<HTMLElement | null>(null);

  const referee = new Referee();

  useEffect(() => {
    let initialBoard: Piece[] = [];
    initialBoard = setupBoard();
    setPieces(initialBoard);
  }, []);

  // set the board
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      let tileKey = `${horizontalAxis[i]}${verticalAxis[j]}`;
      const isEven = (j + i + 2) % 2 === 0;
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Tile key={tileKey} image={image} isEven={isEven}></Tile>);
      //console.log(tileKey);
    }
  }

  const grabPiece = (e: React.MouseEvent) => {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;

    if (element.classList.contains("chess-piece") && chessboard) {
      //console.log(e.target);

      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
      );

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setSelectedPiece(element);
    }
  };

  const movePiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;
    if (selectedPiece && chessboard) {
      //console.log(e.target);
      //console.log(selectedPiece);

      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      selectedPiece.style.position = "absolute";

      selectedPiece.style.left =
        x < minX ? `${minX}px` : x > maxX ? `${maxX}` : `${x}px`;
      selectedPiece.style.top =
        y < minY ? `${minY}px` : y > maxY ? `${maxY}` : `${y}px`;
    }
  };

  const dropPiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;

    if (selectedPiece && chessboard) {
      const newX = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const newY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );

      //console.log(newX, newY);
      setPieces((currentPieces) => {
        const newPieces = currentPieces.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            const isValidMove = referee.isValidMove(
              gridX,
              gridY,
              newX,
              newY,
              p.type,
              p.color,
              currentPieces
            );

            if (isValidMove) {
              p.x = newX;
              p.y = newY;
            } else {
              selectedPiece.style.position = "relative";
              selectedPiece.style.removeProperty("top");
              selectedPiece.style.removeProperty("left");
            }
          }
          return p;
        });
        return newPieces;
      });
      setSelectedPiece(null);
    }
  };

  return (
    <div
      id="chessboard"
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      ref={chessboardRef}
    >
      {board}
    </div>
  );
};

export default Chessboard;
