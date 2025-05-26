import type { ItemType } from '../types';
import Item from './Item';

type ItemsProps = {
  items: Array<ItemType>;
};

export default function Items({ items }: ItemsProps) {
  return (
    <>
      <h2>My current to-do items</h2>
      <div className="items">
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            description={item.description}
          ></Item>
        ))}
      </div>
    </>
  );
}
