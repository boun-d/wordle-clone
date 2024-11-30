import { createContext, useContext, useState } from 'react'

type GameStatus = 'ONGOING' | 'WON' | 'LOST';

interface GameContextType {
    gameStatus: GameStatus;
    setGameStatus: (status: GameStatus) => void;
}

const GameContext = createContext<GameContextType>({
    gameStatus: 'ONGOING',
    setGameStatus: () => {}
})

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [gameStatus, setGameStatus] = useState<GameStatus>('ONGOING')
    return (
        <GameContext.Provider value={{ gameStatus, setGameStatus }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = () => useContext(GameContext);
