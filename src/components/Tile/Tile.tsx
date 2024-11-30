import React from 'react'
import styled from 'styled-components'

export type TileVariant =
    | 'blank'
    | 'guessing'
    | 'current'
    | 'incorrect'
    | 'almost'
    | 'correct'

const TileVariantColourMap: {
    [key in TileVariant]: { main: string; border: string }
} = {
    blank: {
        main: '#2A2A2A',
        border: '#404040',
    },
    guessing: {
        main: '#404040',
        border: '#636363',
    },
    current: {
        main: '#404040',
        border: '#FFFFFF',
    },
    incorrect: {
        main: '#A92626',
        border: '#FF6161',
    },
    almost: {
        main: '#D4783A',
        border: '#FFAF8C',
    },
    correct: {
        main: '#46833A',
        border: '#83FFA8',
    },
}

export type TileState = {
    letter: string
    variant: TileVariant
    row: number
    column: number
}

interface TileProps {
    letter: string
    variant: TileVariant
}

export const Tile: React.FunctionComponent<TileProps> = ({ letter, variant }) => {
    return (
        <TileStyle colours={TileVariantColourMap[variant]}>{letter}</TileStyle>
    )
}

const TileStyle = styled.div<{ colours: { main: string; border: string } }>`
    background-color: ${(props) => props.colours.main};
    border: solid;
    border-color: ${(props) => props.colours.border};
    border-width: 4px;
    display: inline-flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    box-sizing: border-box;
    font-size: calc(var(--square-size) / 2);
    aspect-ratio: 1;
    color: white;
    font-family: riffic;
`;
