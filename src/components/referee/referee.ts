import { PieceType, Color } from "../chessboard/pieceTypes";
import { Piece, Position, samePosition } from "../chessboard/piece";

export default class Referee {
  isTileOccupied(tilePosition: Position, boardState: Piece[]): boolean {
    const piece = boardState.find((p) =>
      samePosition(p.position, tilePosition)
    );
    return piece ? true : false;
    //return piece !== null ? true : false;
  }

  tileIsOccupiedByOpponent(
    tilePosition: Position,
    boardState: Piece[],
    color: Color
  ): boolean {
    const piece = boardState.find(
      (p) => samePosition(p.position, tilePosition) && p.color !== color
    );
    return piece ? true : false;
  }

  isEnPassant(
    previousPosition: Position,
    newPosition: Position,
    type: PieceType,
    color: Color,
    boardState: Piece[]
  ) {
    if (type === PieceType.PAWN) {
      const pawnDirection = color === Color.WHITE ? 1 : -1;

      if (
        (newPosition.x - previousPosition.x === -1 ||
          newPosition.x - previousPosition.x === 1) &&
        newPosition.y - previousPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x === newPosition.x &&
            p.position.y === newPosition.y - pawnDirection &&
            p.enPassant
        );
        //console.log(piece);
        return piece ? true : false;
      }
      return false;
    }
  }

  isValidMove(
    previousPosition: Position,
    newPosition: Position,
    type: PieceType,
    color: Color,
    boardState: Piece[]
  ): boolean {
    // const startRow = color === Color.WHITE ? 1 : 6;
    // const pawnDirection = color === Color.WHITE ? 1 : -1;

    if (type === PieceType.PAWN) {
      return this.pawnMovement(
        previousPosition,
        newPosition,
        color,
        boardState
      );
    } else if (type === PieceType.KNIGHT) {
      return this.knightMovement(
        previousPosition,
        newPosition,
        color,
        boardState
      );
    } else if (type === PieceType.BISHOP) {
      return this.bishopMovement(
        previousPosition,
        newPosition,
        color,
        boardState
      );
    }
    return false;
  }

  pawnMovement(
    previousPosition: Position,
    newPosition: Position,
    color: Color,
    boardState: Piece[]
  ): boolean {
    const startRow = color === Color.WHITE ? 1 : 6;
    const pawnDirection = color === Color.WHITE ? 1 : -1;
    if (
      previousPosition.x === newPosition.x &&
      previousPosition.y === startRow &&
      newPosition.y - previousPosition.y === 2 * pawnDirection
    ) {
      if (
        !this.isTileOccupied(newPosition, boardState) &&
        !this.isTileOccupied(
          { x: newPosition.x, y: newPosition.y - pawnDirection },
          boardState
        )
      ) {
        return true;
      }
    } else if (
      previousPosition.x === newPosition.x &&
      newPosition.y - previousPosition.y === pawnDirection
    ) {
      if (!this.isTileOccupied(newPosition, boardState)) {
        return true;
      }
    }
    // PAWN ATACK LEFT
    else if (
      newPosition.x - previousPosition.x === -1 &&
      newPosition.y - previousPosition.y === pawnDirection
    ) {
      //console.log("left");
      if (this.tileIsOccupiedByOpponent(newPosition, boardState, color)) {
        return true;
      }
      // PAWN ATACK RIGHT
    } else if (
      newPosition.x - previousPosition.x === 1 &&
      newPosition.y - previousPosition.y === pawnDirection
    ) {
      //console.log("right");
      if (this.tileIsOccupiedByOpponent(newPosition, boardState, color)) {
        return true;
      }
    }
    return false;
  }

  knightMovement(
    previousPosition: Position,
    newPosition: Position,
    color: Color,
    boardState: Piece[]
  ): boolean {
    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        // TOP AND BOTTOM MOVEMENT
        if (newPosition.y - previousPosition.y === 2 * i) {
          if (newPosition.x - previousPosition.x === 1 * j) {
            if (
              !this.isTileOccupied(newPosition, boardState) ||
              this.tileIsOccupiedByOpponent(newPosition, boardState, color)
            ) {
              return true;
            }
          }
        }
        // LEFT AND RIGHT MOVEMENT
        if (newPosition.x - previousPosition.x === 2 * i) {
          if (newPosition.y - previousPosition.y === 1 * j) {
            if (
              !this.isTileOccupied(newPosition, boardState) ||
              this.tileIsOccupiedByOpponent(newPosition, boardState, color)
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  bishopMovement(
    previousPosition: Position,
    newPosition: Position,
    color: Color,
    boardState: Piece[]
  ): boolean {
    let passedPosition: Position = { x: -1, y: -1 };
    for (let i = 1; i < 8; i++) {
      // TOP RIGHT
      if (
        newPosition.x > previousPosition.x &&
        newPosition.y > previousPosition.y
      ) {
        passedPosition = {
          x: previousPosition.x + i,
          y: previousPosition.y + i,
        };
        if (
          passedPosition.x === newPosition.x &&
          passedPosition.y === newPosition.y
        ) {
          if (
            this.tileIsOccupiedByOpponent(passedPosition, boardState, color) ||
            !this.isTileOccupied(passedPosition, boardState)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            return false;
          }
        }
      }

      // TOP LEFT
      if (
        newPosition.x < previousPosition.x &&
        newPosition.y > previousPosition.y
      ) {
        passedPosition = {
          x: previousPosition.x - i,
          y: previousPosition.y + i,
        };
        if (
          passedPosition.x === newPosition.x &&
          passedPosition.y === newPosition.y
        ) {
          if (
            this.tileIsOccupiedByOpponent(passedPosition, boardState, color) ||
            !this.isTileOccupied(passedPosition, boardState)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            return false;
          }
        }
      }

      // BOTTOM RIGHT
      if (
        newPosition.x > previousPosition.x &&
        newPosition.y < previousPosition.y
      ) {
        passedPosition = {
          x: previousPosition.x + i,
          y: previousPosition.y - i,
        };
        if (
          passedPosition.x === newPosition.x &&
          passedPosition.y === newPosition.y
        ) {
          if (
            this.tileIsOccupiedByOpponent(passedPosition, boardState, color) ||
            !this.isTileOccupied(passedPosition, boardState)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            return false;
          }
        }
      }

      // BOTTOM LEFT
      if (
        newPosition.x < previousPosition.x &&
        newPosition.y < previousPosition.y
      ) {
        passedPosition = {
          x: previousPosition.x - i,
          y: previousPosition.y - i,
        };
        if (
          passedPosition.x === newPosition.x &&
          passedPosition.y === newPosition.y
        ) {
          if (
            this.tileIsOccupiedByOpponent(passedPosition, boardState, color) ||
            !this.isTileOccupied(passedPosition, boardState)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            return false;
          }
        }
      }
    }

    return false;
  }
}
