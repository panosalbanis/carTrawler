import { useContext, type SyntheticEvent } from 'react';
import type { ItemType } from '../types';
import { UpdateContext } from '../contexts/UpdateContext';
import './Item.css';

type ItemProps = ItemType;

export default function Item({ id, description }: ItemProps) {
  const { setNeedsUpdate } = useContext(UpdateContext);

  const handleDelete = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3000/api/items/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setNeedsUpdate(true);
    } else {
      // TODO: display an error message
    }
  };

  return (
    <div className="item">
      <p>{description}</p>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
