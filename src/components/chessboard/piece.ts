import { Color, PieceType } from "./pieceTypes";

export interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  color: Color;
}
