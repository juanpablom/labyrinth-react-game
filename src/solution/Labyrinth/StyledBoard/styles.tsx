import styled from 'styled-components';
import { ColProps, BoardProps } from '../types';

export const Row = styled.tr`
    border: 1px solid black;
`;

export const Col = styled.td`
    border: 1px solid black;
    height: ${(p: ColProps) => p.cellSize}px;
    width: ${(p: ColProps) => p.cellSize}px;
    text-align: center;
    margin: 0;
    padding: 0;
    background-color: ${(p: ColProps) =>
        p.isStartingPosition ? 'yellow' : p.isTargetPosition ? 'green' : p.available === 0 ? 'grey' : 'white'};
`;

export const Board = styled.table`
    border-collapse: collapse;
    width: ${(p: BoardProps) => p.width}px;
`;
