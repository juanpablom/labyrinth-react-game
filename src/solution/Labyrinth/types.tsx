
export type Position = [/** row */ number, /** col */ number];

export interface Props {
  targetPosition: Position;
  availableCells: (0 | 1)[][];
  startingPosition: Position;
  moveLimit?: number;
  cellSize?: number;
  className?: string;
}

export interface BallProps {
    className?: string;
    posX?: number;
    posY?: number;
    cellSize?: number;
}

export interface ColProps {
    available: number;
    cellSize: number;
    isStartingPosition: boolean;
    isTargetPosition: boolean;
}

export interface BoardProps {
    width: number;
}

export interface WrapperWinProps {
    color?: string;
}

export interface WrapperLostProps {
    color?: string;
}