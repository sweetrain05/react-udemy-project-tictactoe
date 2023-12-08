export default function GameOver({ winner, handleRematchClick }) {
    return (
        <div id='game-over'>
            <h2>Game Over!</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>It's a draw!</p>}
            <p>
                <button onClick={handleRematchClick}>Rematch!</button>
            </p>
        </div>
    );
}
