import { Color, PieceType } from "./pieceTypes";

export interface Position {
  x: number;
  y: number;
}

export interface Piece {
  image: string;
  position: Position;
  type: PieceType;
  color: Color;
  enPassant?: boolean;
}

export function samePosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y;
}
