import { PieceType, Color } from "../chessboard/pieceTypes";
import { Piece, Position } from "../chessboard/piece";
import {
  pawnMovement,
  knightMovement,
  bishopMovement,
  rookMovement,
  queenMovement,
  kingMovement,
} from "./rules";

export default class Referee {
  isValidMove(
    previousPosition: Position,
    newPosition: Position,
    type: PieceType,
    color: Color,
    boardState: Piece[]
  ): boolean {
    // const startRow = color === Color.WHITE ? 1 : 6;
    // const pawnDirection = color === Color.WHITE ? 1 : -1;

    switch (type) {
      case PieceType.PAWN:
        return pawnMovement(previousPosition, newPosition, color, boardState);
      case PieceType.KNIGHT:
        return knightMovement(previousPosition, newPosition, color, boardState);
      case PieceType.BISHOP:
        return bishopMovement(previousPosition, newPosition, color, boardState);
      case PieceType.ROOK:
        return rookMovement(previousPosition, newPosition, color, boardState);
      case PieceType.QUEEN:
        return queenMovement(previousPosition, newPosition, color, boardState);
      case PieceType.KING:
        return kingMovement(previousPosition, newPosition, color, boardState);
      default:
        return false;
    }
  }
}
