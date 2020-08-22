import styled from 'styled-components';
import { WrapperWinProps, WrapperLostProps } from './types';

export const Wrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const WrapperWin = styled.div`
    float: left;
    color: ${(p: WrapperWinProps) => p.color ? p.color : 'green'}
`;  

export const WrapperLost = styled.div`
    float: left;
    color: ${(p: WrapperLostProps) => p.color ? p.color : 'red'}
`;

export const RestartButton = styled.div`
    border-radius: 3px;
    background-color: #555555;
    color: white;
    border: 2px solid #555555;
    padding: 15px 32px;
    text-align: center;
    transition-duration: 0.4s;
    margin: 16px 0 !important;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: black;
    }
`;