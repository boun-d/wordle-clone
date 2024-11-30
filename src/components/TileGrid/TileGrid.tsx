import React from 'react'
import styled from 'styled-components'
import {
    HEADER_HEIGHT_PIXELS,
    KEYBOARD_HEIGHT_PIXELS,
    NUMBER_OF_GUESSES_LENGTH,
    WORD_LENGTH,
} from '../../constants'

import { Tile, TileState } from '../Tile'

interface TileGridProps {
    boardState: TileState[][]
}

export const TileGrid: React.FunctionComponent<TileGridProps> = ({
    boardState,
}) => {
    return (
        <TileGridContainer data-testid="game-board-container">
            <TileGridStyle data-testid="game-board-style">
                <GridContainer
                    data-testid="grid-container"
                >
                    {boardState.map((row, i) => (
                        <React.Fragment key={i}>
                            {row.map(({ letter, variant, row, column }) => (
                                <Tile
                                    key={`tile-${row}-${column}`}
                                    letter={letter}
                                    variant={variant}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </GridContainer>
            </TileGridStyle>
        </TileGridContainer>
    )
}

const TileGridContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(
        100vh - ${KEYBOARD_HEIGHT_PIXELS}px - ${HEADER_HEIGHT_PIXELS}px
    );
`

const TileGridStyle = styled.div`
    --grid-gap: 6px;
    --padding-above-grid: 50px;
    --padding-below-grid: 50px;
    --height: calc(
        100vh - ${KEYBOARD_HEIGHT_PIXELS}px - ${HEADER_HEIGHT_PIXELS}px -
            calc(var(--padding-above-grid) + var(--padding-below-grid))
    );
    --square-size: calc(
        (var(--height) - (${NUMBER_OF_GUESSES_LENGTH - 1} * var(--grid-gap))) /
            ${NUMBER_OF_GUESSES_LENGTH}
    );
    --width: calc(
        var(--square-size) * ${WORD_LENGTH} + var(--grid-gap) *
            ${WORD_LENGTH - 1}
    );
    height: var(--height);
    width: var(--width);
    max-width: 500px;
    margin: 50px 20px;
`

const GridContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(${WORD_LENGTH}, 1fr);
    column-gap: var(--grid-gap);
    row-gap: var(--grid-gap);
    max-row-gap: 10px;
    min-row-gap: 10px;
`
