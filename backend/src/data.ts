import { Item } from './types';

let items: Array<Item>;

export const init = () => {
  items = [
    { id: 1, description: 'Prepare for exam' },
    { id: 2, description: 'Solve practice exercises' },
  ];
};

export const getItems = () => items;

export const setItems = (newItems) => {
  items = newItems;
};

init();
