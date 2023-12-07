export default function Log({ gameTurns }) {
    return (
        <ol id='log'>
            {gameTurns.map((turn) => {
                const { player, square } = turn;
                return (
                    <li
                        key={`${square.row}${square.col}`}
                    >{`${player} selected ${square.row}, ${square.col}`}</li>
                );
            })}
        </ol>
    );
}
