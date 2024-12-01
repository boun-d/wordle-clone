import React, { useState, useCallback, useEffect } from 'react'

import { TileState } from '../Tile'
import { Keyboard } from '../Keyboard'
import { TileGrid } from '../TileGrid'

import { NUMBER_OF_GUESSES_LENGTH, WORD_LENGTH } from '../../constants'
import { getInitialisedBoard } from '~/utils/game'
import { useGameContext } from '~/context/GameContext'
import styled from 'styled-components'
import { api } from '~/utils/api'

const GameStyle = styled.div`
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
`


export const GameBoard: React.FunctionComponent = () => {
    const { gameStatus, setGameStatus } = useGameContext()

    const [currRow, setCurrRow] = useState<number>(0)
    const [currColumn, setCurrColumn] = useState<number | undefined>(0)

    const [boardState, setBoardState] = useState<TileState[][]>([])

    const [correctLetters, setCorrectLetters] = useState<string[]>([])
    const [almostLetters, setAlmostLetters] = useState<string[]>([])
    const [incorrectLetters, setIncorrectLetters] = useState<string[]>([])

    const handleLetter = useCallback<(letter: string) => void>(
        (letter) => {
            console.log(letter)
            if (gameStatus !== 'ONGOING') return
            if (currColumn === undefined) return

            boardState[currRow]![currColumn]!.letter = letter.toUpperCase()
            boardState[currRow]![currColumn]!.variant = 'guessing'
            if (currColumn !== WORD_LENGTH - 1) {
                boardState[currRow]![currColumn + 1]!.variant = 'current'
                setCurrColumn(currColumn + 1)
            } else {
                setCurrColumn(undefined)
            }
            setBoardState(boardState)
        },
        [gameStatus, currRow, currColumn, boardState]
    )

    const handleDelete = useCallback<() => void>(() => {
        if (gameStatus !== 'ONGOING') return
        if (currColumn === 0) return

        if (currColumn === undefined) {
            boardState[currRow]![WORD_LENGTH - 1]!.variant = 'current'
            boardState[currRow]![WORD_LENGTH - 1]!.letter = ''
            setCurrColumn(WORD_LENGTH - 1)
        } else {
            boardState[currRow]![currColumn]!.variant = 'guessing'
            boardState[currRow]![currColumn - 1]!.variant = 'current'
            boardState[currRow]![currColumn - 1]!.letter = ''
            setCurrColumn(currColumn - 1)
        }
        setBoardState(boardState)
    }, [gameStatus, currRow, currColumn, boardState])

    const handleEnter = useCallback<() => void>(() => {
        if (gameStatus !== 'ONGOING') return
        if (currColumn !== undefined) return

        const word = boardState[currRow]!.map((tile) => tile.letter)
        const { data } = api.word.handleGuess.useQuery({ guess: word.join('') });
        const result = data ?? [];

        if (result.length !== WORD_LENGTH) return

        //set variants for current row of letters based on guess result
        boardState[currRow] = boardState[currRow]!.map((tile, i) => ({
            ...tile,
            variant: result[i]!,
        }))

        //push correct letters
        boardState[currRow].forEach((_, i) => {
            if (result[i] === 'correct')
                correctLetters.push(boardState[currRow]![i]!.letter)
            setCorrectLetters(correctLetters)
        })

        //push almost letters
        boardState[currRow].forEach((_, i) => {
            if (
                result[i] === 'almost' &&
                !correctLetters.includes(boardState[currRow]![i]!.letter)
            )
                almostLetters.push(boardState[currRow]![i]!.letter)
            setAlmostLetters(almostLetters)
        })

        //push incorrect letters
        boardState[currRow].forEach((_, i) => {
            if (
                result[i] === 'incorrect' &&
                !almostLetters.includes(boardState[currRow]![i]!.letter)
            )
                incorrectLetters.push(boardState[currRow]![i]!.letter)
            setIncorrectLetters(incorrectLetters)
        })

        if (result.every((r) => r === 'correct')) {
            setGameStatus('WON')
        } else if (currRow === NUMBER_OF_GUESSES_LENGTH - 1) {
            setGameStatus('LOST')
        } else {
            boardState[currRow + 1] = boardState[currRow + 1]!.map((r, i) => ({
                ...r,
                variant: i ? 'guessing' : 'current',
            }))
            setCurrRow(currRow + 1)
            setCurrColumn(0)
            setBoardState(boardState)
        }
    }, [
        gameStatus,
        currRow,
        currColumn,
        boardState,
        correctLetters,
        almostLetters,
        incorrectLetters,
    ])

    useEffect(() => {
        if (false) {
            // setBoardState(existingBoardState)
        } else {
            const init = getInitialisedBoard()
            setBoardState(() => init)
        }
    }, [])

    useEffect(() => {
        const handler = (e: KeyboardEvent): void => {
            const VALID_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (VALID_LETTERS.includes(e.key.toUpperCase())) return handleLetter(e.key);
            if (e.key === 'Enter') return handleEnter();
            if (e.key === 'Backspace') return handleDelete();
        }
        document.addEventListener("keydown", handler);
        return () => {
            document.removeEventListener("keydown", handler);
        };
    }, [handleLetter, handleEnter, handleDelete]);

    return <GameStyle>
        <TileGrid boardState={boardState} />
        <Keyboard
            correctLetters={correctLetters}
            almostLetters={almostLetters}
            incorrectLetters={incorrectLetters}
            handleLetter={handleLetter}
            handleDelete={handleDelete}
            handleEnter={handleEnter}
        />
    </GameStyle>
}
