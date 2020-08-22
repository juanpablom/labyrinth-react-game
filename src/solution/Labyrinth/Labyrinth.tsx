import React, { useState } from 'react';
import { Props } from './types';
import { KEYS, DEFAULT_MOVE_LIMIT } from './constants';
import StyledBall from './StyledBall/StyledBall';
import StyledBoard from './StyledBoard/StyledBoard';
import CustomConfetti from '../CustomConfetti/CustomConfetti';
import { Wrapper, WrapperWin, WrapperLost, RestartButton } from './styles';

const Labyrinth = (props: Props) => {
    const { availableCells, targetPosition, moveLimit = DEFAULT_MOVE_LIMIT } = props;
    const [movesLeft, setMovesLeft] = useState(moveLimit);
    const [posX, setPosX] = useState(props.startingPosition[0]);
    const [posY, setPosY] = useState(props.startingPosition[1]);
    const [finish, setFinish] = useState(false);
    const [won, setWon] = useState(false);
    const rootRef = React.useRef(null);

    const handleRight = () => {
        if (
            availableCells[posY].length - 1 > posX &&
            availableCells[posY][posX + 1] &&
            availableCells[posY][posX + 1] === 1
        ) {
            setPosX((prevState) => prevState + 1);
            setMovesLeft((prevState) => prevState - 1);
        }
    };

    const handleLeft = () => {
        if (posX > 0 && availableCells[posY][posX - 1] && availableCells[posY][posX - 1] === 1) {
            setPosX((prevState) => prevState - 1);
            setMovesLeft((prevState) => prevState - 1);
        }
    };

    const handleDown = () => {
        if (
            availableCells.length - 1 > posY &&
            availableCells[posY + 1][posX] &&
            availableCells[posY + 1][posX] === 1
        ) {
            setPosY((prevState) => prevState + 1);
            setMovesLeft((prevState) => prevState - 1);
        }
    };
    const handleUp = () => {
        if (posY > 0 && availableCells[posY - 1][posX] && availableCells[posY - 1][posX] === 1) {
            setPosY((prevState) => prevState - 1);
            setMovesLeft((prevState) => prevState - 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        e.preventDefault();
        if (finish) return;

        switch (e.keyCode) {
            case KEYS.DOWN:
                handleDown();
                break;
            case KEYS.UP:
                handleUp();
                break;
            case KEYS.LEFT:
                handleLeft();
                break;
            case KEYS.RIGHT:
                handleRight();
                break;
        }
    };

    const checkInitCollision = (): boolean => {
        return availableCells[posY][posX] === 0;
    };

    const endGame = (won: boolean) => {
        setWon(won);
        setFinish(true);
    };

    const checkIfGameFinished = () => {
        if (targetPosition[0] === posY && targetPosition[1] === posX) {
            endGame(true);
        } else {
            if (movesLeft === 0) {
                endGame(false);
            }
        }
    };

    const handleRestart = () => {
        setMovesLeft(moveLimit);
        setPosX(props.startingPosition[0]);
        setPosY(props.startingPosition[1])
        setFinish(false);
        setWon(false);   
    }

    React.useEffect(() => {
        if (checkInitCollision()) {
            setFinish(true);
        }
        
        if (document.activeElement === document.body && rootRef.current){
            rootRef.current.focus();
        } 
    }, []);

    React.useEffect(() => {
        if (!finish) checkIfGameFinished();
    }, [posX, posY]);
    
    const forceFocus = () => {
        rootRef.current && rootRef.current.focus();
    }

    return (
        <React.Fragment>
            <Wrapper data-testid="wrapper" tabIndex={0} onKeyDown={(e) => handleKeyDown(e)} ref={rootRef} onBlur={forceFocus}>
                <StyledBall posX={posX} posY={posY} {...props} />
                <StyledBoard {...props} />
                
                <div>
                    {finish && !won && <WrapperLost data-testid="lose-message">You lost</WrapperLost>}
                    {finish && won && <WrapperWin data-testid="win-message" >You won</WrapperWin>}
                    <div data-testid="moves-message" style={{ float: 'right' }}>
                        moves left {movesLeft}
                    </div>
                </div>
            </Wrapper>
            {finish && won && <CustomConfetti/>}
            <RestartButton onClick={handleRestart}>RESTART</RestartButton>
        </React.Fragment>
    );
};

export default Labyrinth;
