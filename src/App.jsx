import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './winning-combinations';

const PLAYERS = { X: 'Player 1', O: 'Player 2' };
const INITIAL_GAMEBOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns) {
    let currPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currPlayer = 'O';
    }

    return currPlayer;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAMEBOARD.map((array) => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function deriveWinner(gameBoard, players) {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const secondSymbol =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSymbol =
            gameBoard[combination[2].row][combination[2].column];

        if (
            firstSymbol &&
            firstSymbol === secondSymbol &&
            firstSymbol === thirdSymbol
        ) {
            winner = players[firstSymbol];
        }
    }
    return winner;
}

function App() {
    const [players, setPlayers] = useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);

    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

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

    const handleRematchClick = () => {
        setGameTurns([]);
    };

    const handlePlayerNameChange = (symbol, newName) => {
        setPlayers((prev) => ({ ...prev, [symbol]: newName }));
    };

    return (
        <main>
            <div id='game-container'>
                <ol id='players' className='highlight-player'>
                    <Player
                        initialName={PLAYERS.X}
                        symbol='X'
                        isActive={activePlayer === 'X'}
                        handlePlayerNameChange={handlePlayerNameChange}
                    />
                    <Player
                        initialName={PLAYERS.O}
                        symbol='O'
                        isActive={activePlayer === 'O'}
                        handlePlayerNameChange={handlePlayerNameChange}
                    />
                </ol>
                {(winner || hasDraw) && (
                    <GameOver
                        winner={winner}
                        handleRematchClick={handleRematchClick}
                    />
                )}
                <GameBoard
                    gameBoard={gameBoard}
                    handleBoardClick={handleBoardClick}
                />
            </div>
            <Log gameTurns={gameTurns} />
        </main>
    );
}

export default App;
