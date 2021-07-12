import React, { useState, useEffect, useRef } from "react";
import Referee from "../referee/referee";
import { setupBoard } from "./setupBoard";
import { Piece, Position, samePosition } from "./piece";
import { Color, PieceType } from "./pieceTypes";
import { VERTICAL_AXIS, HORIZONTAL_AXIS, GRID_SIZE } from "./constants";
import Tile from "../tiles/tile.component";
import "./chessboard.css";

const Chessboard = () => {
  let board = [];
  const chessboardRef = useRef<HTMLDivElement>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [previousPosition, setPreviousPosition] = useState<Position>({
    x: -1,
    y: -1,
  });
  const [selectedPiece, setSelectedPiece] = useState<HTMLElement | null>(null);

  const referee = new Referee();

  useEffect(() => {
    let initialBoard: Piece[] = [];
    initialBoard = setupBoard();
    setPieces(initialBoard);
  }, []);

  //set the board
  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      let tileKey = `${HORIZONTAL_AXIS[i]}${VERTICAL_AXIS[j]}`;
      const isEven = (j + i + 2) % 2 === 0;
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );
      let image = piece ? piece.image : undefined;
      board.push(<Tile key={tileKey} image={image} isEven={isEven}></Tile>);
      //console.log(tileKey);
    }
  }

  const grabPiece = (e: React.MouseEvent) => {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;

    if (element.classList.contains("chess-piece") && chessboard) {
      //console.log(e.target);
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );
      setPreviousPosition({ x: grabX, y: grabY });

      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
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

      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;

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
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      const currentPiece = pieces.find((p) =>
        samePosition(p.position, previousPosition)
      );

      if (currentPiece) {
        const validMove = referee.isValidMove(
          previousPosition,
          { x, y },
          currentPiece.type,
          currentPiece.color,
          pieces
        );

        const isEnPassantMove = referee.isEnPassant(
          previousPosition,
          { x, y },
          currentPiece.type,
          currentPiece.color,
          pieces
        );

        if (isEnPassantMove) {
          const pawnDirection = currentPiece.color === Color.WHITE ? 1 : -1;
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, previousPosition)) {
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (
              !samePosition(piece.position, { x, y: y - pawnDirection })
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
            if (samePosition(piece.position, previousPosition)) {
              piece.enPassant =
                Math.abs(previousPosition.y - y) === 2 &&
                piece.type === PieceType.PAWN;

              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (!samePosition(piece.position, { x, y })) {
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
