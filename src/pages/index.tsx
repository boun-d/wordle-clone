import { type NextPage } from "next";

import styled from "styled-components";
import { HEADER_HEIGHT_PIXELS } from "~/constants";
import { useState } from "react";
import GameBoard from "~/components/GameBoard";
import Results from "~/components/Results";
import { GameContextProvider } from "~/context/GameContext";

const HeaderStyle = styled.header`
    background-color: var(--grey-header);
    height: ${HEADER_HEIGHT_PIXELS}px;
    display: grid;
    place-items: center;
    font-family: riffic;
    color: white;
    font-size: 36px;
    line-height: 40px;
`

const Home: NextPage = () => {
  const [showResultsOverlay, setShowResultsOverlay] = useState<boolean>(false)

  return (
    <div className="App">
      <GameContextProvider>
        <div style={{ backgroundColor: 'var(--grey-background)' }}>
          <HeaderStyle>wordle</HeaderStyle>
          <GameBoard />
          {showResultsOverlay && (
            <Results setShowResultsOverlay={setShowResultsOverlay} />
          )}
        </div>
      </GameContextProvider>
    </div>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className={styles.authContainer}>
//       <p className={styles.showcaseText}>
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className={styles.loginButton}
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
