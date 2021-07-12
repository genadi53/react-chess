import { PieceType, Color } from "./pieceTypes";
import { Piece } from "./piece";

export const setupBoard = () => {
  const initialBoard: Piece[] = [];

  for (let p = 0; p < 2; p++) {
    const color = p === 0 ? Color.BLACK : Color.WHITE;
    const type = color === Color.BLACK ? "b" : "w";
    const y = color === Color.BLACK ? 7 : 0;
    initialBoard.push({
      image: `assets/images/rook_${type}.png`,
      position: {
        x: 0,
        y,
      },
      type: PieceType.ROOK,
      color,
    });
    initialBoard.push({
      image: `assets/images/rook_${type}.png`,
      position: {
        x: 7,
        y,
      },
      type: PieceType.ROOK,
      color,
    });
    initialBoard.push({
      image: `assets/images/knight_${type}.png`,
      position: {
        x: 1,
        y,
      },
      type: PieceType.KNIGHT,
      color,
    });
    initialBoard.push({
      image: `assets/images/knight_${type}.png`,
      position: {
        x: 6,
        y,
      },
      type: PieceType.KNIGHT,
      color,
    });
    initialBoard.push({
      image: `assets/images/bishop_${type}.png`,
      position: {
        x: 2,
        y,
      },
      type: PieceType.BISHOP,
      color,
    });
    initialBoard.push({
      image: `assets/images/bishop_${type}.png`,
      position: {
        x: 5,
        y,
      },
      type: PieceType.BISHOP,
      color,
    });
    initialBoard.push({
      image: `assets/images/queen_${type}.png`,
      position: {
        x: 3,
        y,
      },
      type: PieceType.QUEEN,
      color,
    });
    initialBoard.push({
      image: `assets/images/king_${type}.png`,
      position: {
        x: 4,
        y,
      },
      type: PieceType.KING,
      color,
    });
  }

  for (let i = 0; i < 8; i++) {
    initialBoard.push({
      image: "assets/images/pawn_b.png",
      position: {
        x: i,
        y: 6,
      },
      type: PieceType.PAWN,
      color: Color.BLACK,
    });
    initialBoard.push({
      image: "assets/images/pawn_w.png",
      position: {
        x: i,
        y: 1,
      },
      type: PieceType.PAWN,
      color: Color.WHITE,
    });
  }
  return initialBoard;
};
