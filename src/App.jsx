import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [activePlayer, setActivePlayer] = useState('X');

    const handleSwitchPlayer = () => {
        setActivePlayer((curr) => (curr === 'X' ? 'O' : 'X'));
    };

    const handleBoardClick = (rowIndex, colIndex) => {
        setGameTurns((prev) => {
            let currPlayer;
            if (prev.length > 0 && prev[0].player === 'X') currPlayer = 'O';
            else currPlayer = 'X';

            const updatedGameTurns = [...prev];
            updatedGameTurns.unshift({
                square: { row: rowIndex, col: colIndex },
                player: currPlayer,
            });
            console.log(updatedGameTurns);
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
