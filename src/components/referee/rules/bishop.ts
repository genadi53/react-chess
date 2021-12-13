import { Color } from "../../chessboard/pieceTypes";
import { Piece, Position, samePosition } from "../../chessboard/piece";
import { tileIsOccupiedByOpponent, isTileOccupied } from "./basicRules";

export const bishopMovement = (
  previousPosition: Position,
  newPosition: Position,
  color: Color,
  boardState: Piece[]
): boolean => {
  let directionY = newPosition.y < previousPosition.y ? -1 : 1;
  let directionX = newPosition.x < previousPosition.x ? -1 : 1;

  for (let i = 1; i < 8; i++) {
    let passedPosition: Position = {
      x: previousPosition.x + i * directionX,
      y: previousPosition.y + i * directionY,
    };
    if (samePosition(passedPosition, newPosition)) {
      if (
        tileIsOccupiedByOpponent(passedPosition, boardState, color) ||
        !isTileOccupied(passedPosition, boardState)
      ) {
        return true;
      }
    } else {
      if (isTileOccupied(passedPosition, boardState)) {
        return false;
      }
    }
  }

  return false;
};
