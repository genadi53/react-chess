import { Color, PieceType } from "../../chessboard/pieceTypes";
import { Piece, Position } from "../../chessboard/piece";
import { tileIsOccupiedByOpponent, isTileOccupied } from "./basicRules";

export const pawnMovement = (
  previousPosition: Position,
  newPosition: Position,
  color: Color,
  boardState: Piece[]
): boolean => {
  const startRow = color === Color.WHITE ? 1 : 6;
  const pawnDirection = color === Color.WHITE ? 1 : -1;
  if (
    previousPosition.x === newPosition.x &&
    previousPosition.y === startRow &&
    newPosition.y - previousPosition.y === 2 * pawnDirection
  ) {
    if (
      !isTileOccupied(newPosition, boardState) &&
      !isTileOccupied(
        { x: newPosition.x, y: newPosition.y - pawnDirection },
        boardState
      )
    ) {
      return true;
    }
  } else if (
    previousPosition.x === newPosition.x &&
    newPosition.y - previousPosition.y === pawnDirection
  ) {
    if (!isTileOccupied(newPosition, boardState)) {
      return true;
    }
  }
  // PAWN ATACK LEFT
  else if (
    newPosition.x - previousPosition.x === -1 &&
    newPosition.y - previousPosition.y === pawnDirection
  ) {
    if (tileIsOccupiedByOpponent(newPosition, boardState, color)) {
      return true;
    }
    // PAWN ATACK RIGHT
  } else if (
    newPosition.x - previousPosition.x === 1 &&
    newPosition.y - previousPosition.y === pawnDirection
  ) {
    if (tileIsOccupiedByOpponent(newPosition, boardState, color)) {
      return true;
    }
  }
  return false;
};

export const isEnPassant = (
  previousPosition: Position,
  newPosition: Position,
  type: PieceType,
  color: Color,
  boardState: Piece[]
) => {
  if (type === PieceType.PAWN) {
    const pawnDirection = color === Color.WHITE ? 1 : -1;

    if (
      (newPosition.x - previousPosition.x === -1 ||
        newPosition.x - previousPosition.x === 1) &&
      newPosition.y - previousPosition.y === pawnDirection
    ) {
      const piece = boardState.find(
        (p) =>
          p.position.x === newPosition.x &&
          p.position.y === newPosition.y - pawnDirection &&
          p.enPassant
      );
      return piece ? true : false;
    }
    return false;
  }
};
