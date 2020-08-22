import React from 'react';
import { Props } from '../types';
import { DEFAULT_CELL_SIZE } from '../constants';
import { Board, Row, Col } from './styles'
import cheese from './../../../assets/cheese.png'

const StyledBoard = React.memo((props: Props) => {
    const { availableCells, className, cellSize = DEFAULT_CELL_SIZE } = props;
    const isStartingPosition = (i: number, j: number): boolean => {
        return props.startingPosition[0] === i && props.startingPosition[1] === j;
    };

    const isTargetPosition = (i: number, j: number): boolean => {
        return props.targetPosition[0] === i && props.targetPosition[1] === j;
    };

    const getBoardWith = (cellSize: number, availableCells: (0 | 1)[][]) => {
        return availableCells.length > 0 ? cellSize * props.availableCells[0].length : cellSize;
    };

    return (
        <Board data-testid="board" className={className} width={getBoardWith(cellSize, availableCells)}>
            <tbody>
                {availableCells.map((row, i) => (
                    <Row key={i}>
                        {row.map((col, j) => (
                            <Col
                                key={j}
                                available={col}
                                cellSize={cellSize}
                                isTargetPosition={isTargetPosition(i, j)}
                                isStartingPosition={isStartingPosition(i, j)}
                            >
                                {isTargetPosition(i, j) ? <img src={cheese} alt='Cheese' height={DEFAULT_CELL_SIZE} width={DEFAULT_CELL_SIZE} /> : null}
                            </Col>
                        ))}
                    </Row>
                ))}
            </tbody>
        </Board>
    );
});

export default StyledBoard;
