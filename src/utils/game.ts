import { TileState } from "~/components/Tile"
import { NUMBER_OF_GUESSES_LENGTH, WORD_LENGTH } from "~/constants"

const getInitialisedBoard = (): TileState[][] => {
    const newBoardState: TileState[][] = []
    for (let i = 0; i < NUMBER_OF_GUESSES_LENGTH; i++) {
        const newRowState: TileState[] = []
        for (let j = 0; j < WORD_LENGTH; j++) {
            newRowState.push({
                letter: '',
                variant: i === 0 ? 'guessing' : 'blank',
                row: i,
                column: j,
            })
        }
        newBoardState.push(newRowState)
    }
    newBoardState[0]![0]!.variant = 'current'
    return newBoardState
}

export { getInitialisedBoard };