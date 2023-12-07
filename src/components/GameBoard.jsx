import { useState } from 'react';

const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({ activePlayerSymbol, handleSwitchPlayer }) {
    const [gameboard, setGameBoard] = useState(initialBoard);

    const handleBoardClick = (row, col) => {
        setGameBoard((prev) => {
            const updatedBoard = [...prev.map((innerArray) => [...innerArray])];
            updatedBoard[row][col] = activePlayerSymbol;
            return updatedBoard;
        });
        handleSwitchPlayer();
    };

    return (
        <ol id='game-board'>
            {gameboard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button
                                    onClick={() =>
                                        handleBoardClick(rowIndex, colIndex)
                                    }
                                >
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
