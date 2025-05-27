/* eslint-disable @typescript-eslint/no-unused-expressions */

import Items from './Items';
import { render, screen } from '@testing-library/react';

const items = [
  { id: 1, description: 'todo item 1' },
  { id: 2, description: 'todo item 2' },
];

describe('Items', () => {
  it('Renders a list of Items', async () => {
    render(<Items items={items}></Items>);
    expect(screen.findByText('My current to-do items')).toBeTruthy;
    expect(screen.findByText('todo item 1')).toBeTruthy;
    expect(screen.findByText('todo item 2')).toBeTruthy;
  });
});
