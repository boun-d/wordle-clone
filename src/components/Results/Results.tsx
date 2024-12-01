import styled from 'styled-components'
import { HEADER_HEIGHT_PIXELS } from '../../constants'
import { useGameContext } from '~/context/GameContext';
import { useEffect } from 'react';

interface ResultsProps {
    setShowResultsOverlay: (show: boolean) => void
}

export const Results: React.FunctionComponent<ResultsProps> = ({
    setShowResultsOverlay
}) => {
    const { gameStatus } = useGameContext();
    const heading = gameStatus === 'WON' ? 'Well done!' : gameStatus === "LOST" ? 'Not quite!' : undefined;

    useEffect(() => {
        if (gameStatus !== 'ONGOING') setShowResultsOverlay(true)
    }, [gameStatus])

    return (
        <ResultsOverlay>
            <ResultsContainer>
                <div style={{ display: 'flex' }}>
                    <Grow />
                    <CloseButton onClick={() => setShowResultsOverlay(false)}>X</CloseButton>
                </div>
                <br />
                {!!heading && <ResultHeading>{heading}</ResultHeading>}
            </ResultsContainer>
        </ResultsOverlay>
    )
}

const ResultsOverlay = styled.div`
    display: block;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
`

const ResultsContainer = styled.div`
    background-color: #1f1f1f;
    width: 85%;
    max-width: 500px;
    height: 70%;
    margin: ${HEADER_HEIGHT_PIXELS + 20}px auto auto auto;
    border-radius: 3px;
    padding: 10px;
`

const Grow = styled.span`
    flex-grow: 1;
    display: inline-block;
`

const CloseButton = styled.span`
    display: inline-block;
    color: #AAA;
    font-size: 24px;
    font-weight: bold;
    font-family: lilitaOne;
    padding: 10px 15px;
    border-radius: 3px;

    :hover {
        cursor: pointer;
        background-color: #141414;
    }
`

const ResultHeading = styled.div`
    color: white;
    font-family: riffic;
    font-size: 36px;
    display: grid;
    place-items: center;
    margin: unset;
`
