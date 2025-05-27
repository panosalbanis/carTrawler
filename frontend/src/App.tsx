import { useEffect, useState } from 'react';
import './App.css';
import Items from './components/Items';
import type { ItemType } from './types';
import AddItem from './components/AddItem';
import { UpdateContext } from './contexts/UpdateContext';

function App() {
  const [items, setItems] = useState<Array<ItemType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [needsUpdate, setNeedsUpdate] = useState(true);

  useEffect(() => {
    // An update is needed if an ADD of DELETE operation has been completed
    if (needsUpdate) {
      setIsLoading(true);

      const fetchItems = async () => {
        const response = await fetch('http://localhost:3000/api/items');
        const data = await response.json();
        setItems(data);
        // Assuming the ids are sequential
        setCurrentId(data[data.length - 1].id);
        setIsLoading(false);
      };

      fetchItems();
      setNeedsUpdate(false);
    }
  }, [needsUpdate]);

  return (
    <>
      <UpdateContext.Provider value={{ needsUpdate, setNeedsUpdate }}>
        <h1>My to-do list</h1>
        <AddItem
          currentId={currentId}
          setCurrentId={setCurrentId}
          setNeedsUpdate={setNeedsUpdate}
        ></AddItem>
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <Items items={items}></Items>
        )}
      </UpdateContext.Provider>
    </>
  );
}

export default App;
