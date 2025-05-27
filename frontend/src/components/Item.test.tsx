/* eslint-disable @typescript-eslint/no-unused-expressions */

import Item from './Item';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UpdateContext } from '../contexts/UpdateContext';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
    } as unknown as Response)
  );
});

afterEach(() => {
  (global.fetch as jest.Mock).mockClear();
});

describe('Item', () => {
  it('Renders an Item with a delete button', async () => {
    render(
      <UpdateContext.Provider
        value={{ needsUpdate: false, setNeedsUpdate: jest.fn() }}
      >
        <Item id={1} description="to do item"></Item>
      </UpdateContext.Provider>
    );
    expect(screen.findByText('to do item')).toBeTruthy;
    expect(screen.findByText('delete')).toBeTruthy;
  });

  it('Correctly deletes the item if the delete button is clicked', async () => {
    const setNeedsUpdate = jest.fn();
    render(
      <UpdateContext.Provider value={{ needsUpdate: false, setNeedsUpdate }}>
        <Item id={1} description="to do item"></Item>
      </UpdateContext.Provider>
    );

    await userEvent.click(screen.getByText('Delete'));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/items/1',
      { method: 'DELETE' }
    );
    expect(setNeedsUpdate).toHaveBeenCalledTimes(1);
  });
});
