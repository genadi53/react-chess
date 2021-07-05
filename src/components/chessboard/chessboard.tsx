import React, { useState, useEffect, useRef } from "react";
import Tile from "../tiles/tile.component";

import "./chessboard.css";
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
  image: string;
  //   hoisontalPos: string;
  //   verticalPos: string;
  x: number;
  y: number;
}

const Chessboard = () => {
  let board = [];
  //let selectedPiece: HTMLElement | null = null;

  const chessboardRef = useRef<HTMLDivElement>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const initialBoard: Piece[] = [];
    for (let i = 0; i < 8; i++) {
      initialBoard.push({ image: "assets/images/pawn_b.png", x: i, y: 6 });
      initialBoard.push({ image: "assets/images/pawn_w.png", x: i, y: 1 });
    }

    for (let p = 0; p < 2; p++) {
      const type = p === 0 ? "b" : "w";
      const y = p === 0 ? 7 : 0;
      initialBoard.push({ image: `assets/images/rook_${type}.png`, x: 0, y });
      initialBoard.push({ image: `assets/images/rook_${type}.png`, x: 7, y });
      initialBoard.push({ image: `assets/images/knight_${type}.png`, x: 1, y });
      initialBoard.push({ image: `assets/images/knight_${type}.png`, x: 6, y });
      initialBoard.push({ image: `assets/images/bishop_${type}.png`, x: 2, y });
      initialBoard.push({ image: `assets/images/bishop_${type}.png`, x: 5, y });
      initialBoard.push({ image: `assets/images/queen_${type}.png`, x: 3, y });
      initialBoard.push({ image: `assets/images/king_${type}.png`, x: 4, y });
    }
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

      console.log(newX, newY);
      setPieces((currentPieces) => {
        const newPieces = currentPieces.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            p.x = newX;
            p.y = newY;
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
