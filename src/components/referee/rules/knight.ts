import { Color } from "../../chessboard/pieceTypes";
import { Piece, Position } from "../../chessboard/piece";
import { tileIsOccupiedByOpponent, isTileOccupied } from "./basicRules";

export const knightMovement = (
  previousPosition: Position,
  newPosition: Position,
  color: Color,
  boardState: Piece[]
): boolean => {
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      // TOP AND BOTTOM MOVEMENT
      if (newPosition.y - previousPosition.y === 2 * i) {
        if (newPosition.x - previousPosition.x === 1 * j) {
          if (
            !isTileOccupied(newPosition, boardState) ||
            tileIsOccupiedByOpponent(newPosition, boardState, color)
          ) {
            return true;
          }
        }
      }
      // LEFT AND RIGHT MOVEMENT
      if (newPosition.x - previousPosition.x === 2 * i) {
        if (newPosition.y - previousPosition.y === 1 * j) {
          if (
            !isTileOccupied(newPosition, boardState) ||
            tileIsOccupiedByOpponent(newPosition, boardState, color)
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
};
