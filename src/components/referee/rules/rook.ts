import { Color } from "../../chessboard/pieceTypes";
import { Piece, Position, samePosition } from "../../chessboard/piece";
import { tileIsOccupiedByOpponent, isTileOccupied } from "./basicRules";

export const rookMovement = (
  previousPosition: Position,
  newPosition: Position,
  color: Color,
  boardState: Piece[]
): boolean => {
  // Moving vertically
  if (previousPosition.x === newPosition.x) {
    for (let i = 1; i < 8; i++) {
      let directionY = newPosition.y < previousPosition.y ? -1 : 1;
      let passedPosition: Position = {
        x: previousPosition.x,
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
  }

  // Moving horizontally
  if (previousPosition.y === newPosition.y) {
    for (let i = 1; i < 8; i++) {
      let directionX = newPosition.x < previousPosition.x ? -1 : 1;
      let passedPosition: Position = {
        x: previousPosition.x + i * directionX,
        y: previousPosition.y,
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
  }
  return false;
};
