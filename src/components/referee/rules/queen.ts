import { Color } from "../../chessboard/pieceTypes";
import { Piece, Position, samePosition } from "../../chessboard/piece";
import { tileIsOccupiedByOpponent, isTileOccupied } from "./basicRules";

export const queenMovement = (
  previousPosition: Position,
  newPosition: Position,
  color: Color,
  boardState: Piece[]
): boolean => {
  for (let i = 1; i < 8; i++) {
    // Moving to the left, right or stay on the same x-file
    let directionX =
      newPosition.x < previousPosition.x
        ? -1
        : newPosition.x > previousPosition.x
        ? 1
        : 0;
    // Moving up, down or stay on the same y-file
    let directionY =
      newPosition.y < previousPosition.y
        ? -1
        : newPosition.y > previousPosition.y
        ? 1
        : 0;

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
