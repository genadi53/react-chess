import { PieceType, Color } from "../chessboard/pieceTypes";
import { Piece, Position } from "../chessboard/piece";

export default class Referee {
  isTileOccupied(tilePosition: Position, boardState: Piece[]): boolean {
    const piece = boardState.find(
      (p) => p.position.x === tilePosition.x && p.position.y === tilePosition.y
    );
    return piece ? true : false;
    //return piece !== null ? true : false;
  }

  tileIsOccupiedByOpponent(
    tilePosition: Position,
    boardState: Piece[],
    color: Color
  ): boolean {
    const piece = boardState.find(
      (p) =>
        p.position.x === tilePosition.x &&
        p.position.y === tilePosition.y &&
        p.color !== color
    );
    return piece ? true : false;
  }

  isEnPassant(
    previousPosition: Position,
    newPosition: Position,
    type: PieceType,
    color: Color,
    boardState: Piece[]
  ) {
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
        //console.log(piece);
        return piece ? true : false;
      }
      return false;
    }
  }
  isValidMove(
    previousPosition: Position,
    newPosition: Position,
    type: PieceType,
    color: Color,
    boardState: Piece[]
  ) {
    const startRow = color === Color.WHITE ? 1 : 6;
    const pawnDirection = color === Color.WHITE ? 1 : -1;

    // PAWN MOVEMENT
    if (type === PieceType.PAWN) {
      if (
        previousPosition.x === newPosition.x &&
        previousPosition.y === startRow &&
        newPosition.y - previousPosition.y === 2 * pawnDirection
      ) {
        if (
          !this.isTileOccupied(newPosition, boardState) &&
          !this.isTileOccupied(
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
        if (!this.isTileOccupied(newPosition, boardState)) {
          return true;
        }
      }
      // PAWN ATACK LEFT
      else if (
        newPosition.x - previousPosition.x === -1 &&
        newPosition.y - previousPosition.y === pawnDirection
      ) {
        //console.log("left");
        if (this.tileIsOccupiedByOpponent(newPosition, boardState, color)) {
          return true;
        }
        // PAWN ATACK RIGHT
      } else if (
        newPosition.x - previousPosition.x === 1 &&
        newPosition.y - previousPosition.y === pawnDirection
      ) {
        //console.log("right");
        if (this.tileIsOccupiedByOpponent(newPosition, boardState, color)) {
          return true;
        }
      }
    }
    return false;
  }
}
