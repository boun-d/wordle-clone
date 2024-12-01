import { createContext, useContext, useState } from 'react'

type GameStatus = 'ONGOING' | 'WON' | 'LOST';

interface GameContextType {
    gameStatus: GameStatus;
    correctLetters: string[];
    almostLetters: string[];
    incorrectLetters: string[];
    setGameStatus: (status: GameStatus) => void;
    setCorrectLetters: (letters: string[]) => void;
    setAlmostLetters: (letters: string[]) => void;
    setIncorrectLetters: (letters: string[]) => void;
}

const GameContext = createContext<GameContextType>({
    gameStatus: 'ONGOING',
    correctLetters: [],
    almostLetters: [],
    incorrectLetters: [],
    setGameStatus: () => { },
    setCorrectLetters: () => { },
    setAlmostLetters: () => { },
    setIncorrectLetters: () => { }
})

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [gameStatus, setGameStatus] = useState<GameStatus>('ONGOING')
    const [correctLetters, setCorrectLetters] = useState<string[]>([])
    const [almostLetters, setAlmostLetters] = useState<string[]>([])
    const [incorrectLetters, setIncorrectLetters] = useState<string[]>([])
    return (
        <GameContext.Provider value={{ gameStatus, correctLetters, almostLetters, incorrectLetters, setGameStatus, setCorrectLetters, setAlmostLetters, setIncorrectLetters }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = () => useContext(GameContext);
