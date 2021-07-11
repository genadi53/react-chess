import { PieceType, Color } from "../chessboard/pieceTypes";
import { Piece } from "../chessboard/piece";

export default class Referee {
  isTileOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.x === x && p.y === y);
    return piece ? true : false;
    //return piece !== null ? true : false;
  }

  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: Color,
    boardState: Piece[]
  ) {
    const startRow = team === Color.WHITE ? 1 : 6;
    const pawnDirection = team === Color.WHITE ? 1 : -1;

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
      return false;
    }
  }
}
