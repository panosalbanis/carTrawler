import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import './AddItem.css';

type Props = {
  currentId: number;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
  setNeedsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddItem({
  currentId,
  setCurrentId,
  setNeedsUpdate,
}: Props) {
  const [description, setDescription] = useState('');
  const handleClick = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!description) {
      return;
    }

    const response = await fetch('http://localhost:3000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: currentId + 1,
        description: description,
      }),
    });

    if (response.ok) {
      setCurrentId(currentId + 1);
      setDescription('');
      setNeedsUpdate(true);
    } else {
      // TODO: display an error message
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  return (
    <div className="add-item">
      <textarea
        rows={1}
        className="item-input"
        placeholder="Add a new item..."
        value={description}
        onChange={handleChange}
      ></textarea>
      <button onClick={handleClick} className="submit-button">
        Add
      </button>
    </div>
  );
}
