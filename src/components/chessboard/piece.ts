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
