import React, { useState, useEffect, useRef } from "react";
import Referee from "../referee/referee";
import { setupBoard } from "./setupBoard";
import { Piece } from "./piece";
import { Color, PieceType, verticalAxis, horizontalAxis } from "./pieceTypes";
import Tile from "../tiles/tile.component";
import "./chessboard.css";

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

  //set the board
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      let tileKey = `${horizontalAxis[i]}${verticalAxis[j]}`;
      const isEven = (j + i + 2) % 2 === 0;
      let image = undefined;

      pieces.forEach((p) => {
        if (p.position.x === i && p.position.y === j) {
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

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (selectedPiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );

      const currentPiece = pieces.find(
        (p) => p.position.x === gridX && p.position.y === gridY
      );
      //const attackedPiece = pieces.find((p) => p.position.x === x && p.position.y === y);

      if (currentPiece) {
        const validMove = referee.isValidMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.color,
          pieces
        );

        const isEnPassantMove = referee.isEnPassant(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.color,
          pieces
        );

        if (isEnPassantMove) {
          const pawnDirection = currentPiece.color === Color.WHITE ? 1 : -1;
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.position.x === gridX && piece.position.y === gridY) {
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (
              !(
                piece.position.x === x && piece.position.y === y - pawnDirection
              )
            ) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }
            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else if (validMove) {
          //UPDATES THE PIECE POSITION
          //AND IF A PIECE IS ATTACKED, REMOVES IT
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.position.x === gridX && piece.position.y === gridY) {
              if (Math.abs(gridY - y) === 2 && piece.type === PieceType.PAWN) {
                piece.enPassant = true;
                //console.log(piece.enPassant);
              } else {
                piece.enPassant = false;
                //console.log(piece.enPassant);
              }
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (!(piece.position.x === x && piece.position.y === y)) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }

            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else {
          //RESETS THE PIECE POSITION
          selectedPiece.style.position = "relative";
          selectedPiece.style.removeProperty("top");
          selectedPiece.style.removeProperty("left");
        }
      }
      setSelectedPiece(null);
    }
  }

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
