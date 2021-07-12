import { PieceType, Color } from "../chessboard/pieceTypes";
import { Piece } from "../chessboard/piece";

export default class Referee {
  isTileOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y
    );
    return piece ? true : false;
    //return piece !== null ? true : false;
  }

  tileIsOccupiedByOpponent(
    x: number,
    y: number,
    boardState: Piece[],
    color: Color
  ): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y && p.color !== color
    );
    return piece ? true : false;
  }

  isEnPassant(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    color: Color,
    boardState: Piece[]
  ) {
    if (type === PieceType.PAWN) {
      const pawnDirection = color === Color.WHITE ? 1 : -1;

      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
        const piece = boardState.find(
          (p) =>
            p.position.x === x &&
            p.position.y === y - pawnDirection &&
            p.enPassant
        );
        //console.log(piece);
        return piece ? true : false;
      }
      return false;
    }
  }
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    color: Color,
    boardState: Piece[]
  ) {
    const startRow = color === Color.WHITE ? 1 : 6;
    const pawnDirection = color === Color.WHITE ? 1 : -1;

    // PAWN MOVEMENT
    if (type === PieceType.PAWN) {
      if (px === x && py === startRow && y - py === 2 * pawnDirection) {
        if (
          !this.isTileOccupied(x, y, boardState) &&
          !this.isTileOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.isTileOccupied(x, y, boardState)) {
          return true;
        }
      }
      // PAWN ATACK LEFT
      else if (x - px === -1 && y - py === pawnDirection) {
        //console.log("left");
        if (this.tileIsOccupiedByOpponent(x, y, boardState, color)) {
          return true;
        }
        // PAWN ATACK RIGHT
      } else if (x - px === 1 && y - py === pawnDirection) {
        //console.log("right");
        if (this.tileIsOccupiedByOpponent(x, y, boardState, color)) {
          return true;
        }
      }
    }
    return false;
  }
}
