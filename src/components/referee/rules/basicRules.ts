import { Color } from "../../chessboard/pieceTypes";
import { Piece, Position, samePosition } from "../../chessboard/piece";

export const isTileOccupied = (
  tilePosition: Position,
  boardState: Piece[]
): boolean => {
  const piece = boardState.find((p) => samePosition(p.position, tilePosition));
  return piece ? true : false;
  //return piece !== null ? true : false;
};

export const tileIsOccupiedByOpponent = (
  tilePosition: Position,
  boardState: Piece[],
  color: Color
): boolean => {
  const piece = boardState.find(
    (p) => samePosition(p.position, tilePosition) && p.color !== color
  );
  return piece ? true : false;
};
