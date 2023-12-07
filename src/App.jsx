import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

function deriveActivePlayer(gameTurns) {
    let currPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currPlayer = 'O';
    }

    return currPlayer;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const activePlayer = deriveActivePlayer(gameTurns);

    const handleBoardClick = (rowIndex, colIndex) => {
        setGameTurns((prev) => {
            const currPlayer = deriveActivePlayer(prev);

            const updatedGameTurns = [...prev];
            updatedGameTurns.unshift({
                square: { row: rowIndex, col: colIndex },
                player: currPlayer,
            });

            return updatedGameTurns;
        });
    };

    return (
        <main>
            <div id='game-container'>
                <ol id='players' className='highlight-player'>
                    <Player
                        initialName='Player 1'
                        symbol='X'
                        isActive={activePlayer === 'X'}
                    />
                    <Player
                        initialName='Player 2'
                        symbol='O'
                        isActive={activePlayer === 'O'}
                    />
                </ol>
                <GameBoard
                    gameTurns={gameTurns}
                    handleBoardClick={handleBoardClick}
                />
            </div>
            <Log gameTurns={gameTurns} />
        </main>
    );
}

export default App;
