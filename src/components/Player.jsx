import { useState } from 'react';

export default function Player({
    initialName,
    symbol,
    isActive,
    handlePlayerNameChange,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const handleEditClick = () => {
        setIsEditing((prev) => !prev);
        if (isEditing) handlePlayerNameChange(symbol, playerName);
    };

    const handleInputChange = (e) => {
        setPlayerName(e.target.value);
    };

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>
                {isEditing ? (
                    <input
                        type='text'
                        required
                        value={playerName}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span className='player-name'>{playerName}</span>
                )}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </li>
    );
}
