import React from 'react'
import styled from 'styled-components'
import { KEYBOARD_HEIGHT_PIXELS } from '../../constants';

type KeyVariant = 'default' | 'correct' | 'almost' | 'incorrect'

const KeyVariantColourMap: {
    [key in KeyVariant]: string;
} = {
    default: '#959595',
    correct: '#46833A',
    almost: '#D4783A',
    incorrect: '#404040',
};

interface KeyboardProps {
    correctLetters: string[];
    almostLetters: string[];
    incorrectLetters: string[];
    handleLetter: (letter: string) => void;
    handleDelete: () => void;
    handleEnter: () => void;
}

export const Keyboard: React.FunctionComponent<KeyboardProps> = ({
    correctLetters,
    almostLetters,
    incorrectLetters,
    handleLetter,
    handleDelete,
    handleEnter,
}) => {
    const TOP_ROW_LETTERS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const MIDDLE_ROW_LETTERS = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const BOTTOM_ROW_LETTERS = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

    const getKeyVariant = (letter: string): KeyVariant => {
        if (correctLetters.includes(letter)) return 'correct'
        if (almostLetters.includes(letter)) return 'almost'
        if (incorrectLetters.includes(letter)) return 'incorrect'
        return 'default';
    }

    return (
        <KeyboardStyle>
            <RowStyle>
                {TOP_ROW_LETTERS.map((letter) => (
                    <Key letter={letter} variant={getKeyVariant(letter)} handleKeyPress={handleLetter} key={letter} />
                ))}
            </RowStyle>
            <RowStyle>
                <Spacer />
                {MIDDLE_ROW_LETTERS.map((letter) => (
                    <Key letter={letter} variant={getKeyVariant(letter)} handleKeyPress={handleLetter} key={letter} />
                ))}
                <Spacer />
            </RowStyle>
            <RowStyle>
                <KeyStyle $colour={KeyVariantColourMap['default']} style={{ flex: '1.5', fontSize: '0.75rem' }} onClick={() => handleEnter()}>Enter</KeyStyle>
                {BOTTOM_ROW_LETTERS.map((letter) => (
                    <Key letter={letter} variant={getKeyVariant(letter)} handleKeyPress={handleLetter} key={letter} />
                ))}
                <KeyStyle $colour={KeyVariantColourMap['default']} style={{ flex: '1.5', fontSize: '0.75rem' }} onClick={() => handleDelete()}>Delete</KeyStyle>
            </RowStyle>
        </KeyboardStyle>
    )
}

interface KeyProps {
    letter: string
    variant: KeyVariant
    handleKeyPress: (letter: string) => void
}

const Key: React.FunctionComponent<KeyProps> = ({ letter, variant, handleKeyPress }) => {
    return (
        <KeyStyle $colour={KeyVariantColourMap[variant]} onClick={() => handleKeyPress(letter)}>
            {letter}
        </KeyStyle>
    )
}

const KeyboardStyle = styled.div`
    height: ${KEYBOARD_HEIGHT_PIXELS}px;
    margin: 0 8px;
    user-select: none;
`

const RowStyle = styled.div`
    display: flex;
    width: 100%;
    margin: 0 auto 8px;
    touch-action: manipulation;
`

const Spacer = styled.div`
    display: block;
    flex: 0.5;
`

const KeyStyle = styled.button<{ $colour: string }>`
    font-family: inherit;
    font-weight: bold;
    border: 0;
    padding: 0;
    margin: 0 6px 0 0;
    height: 58px;
    border-radius: 3px;
    cursor: pointer;
    user-select: none;
    background-color: ${props => props.$colour};
    color: white;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`
