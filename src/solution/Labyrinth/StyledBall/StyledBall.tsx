import React from 'react';
import styled from 'styled-components';
import { BallProps } from '../types';
import rat from './../../../assets/rat.png'

const Ball = ({ className }: BallProps) => {
    return <div data-testid="ball" className={className}> <img alt='Rat' src={rat} width={30} height={30}/> </div>;
};

const StyledBall = styled(Ball)`
    position: absolute;
    transform: translate(
        ${(props) => (props.posX ? props.posX * (props.cellSize + 1) : 0)}px,
        ${(props) => (props.posY ? props.posY * (props.cellSize + 1) : 0)}px
    );
    transition: all 0.1s linear 0.1s;
    height: ${(props) => props.cellSize}px;
    width: ${(props) => props.cellSize}px;
    text-align: center;
`;

export default StyledBall;
