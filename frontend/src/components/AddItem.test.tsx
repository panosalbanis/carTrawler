import AddItem from './AddItem';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

describe('AddItem', () => {
  const currentId = 1;
  const description = 'todo item';
  const setCurrentId = jest.fn();
  const setNeedsUpdate = jest.fn();

  it('Renders the Add Item component and allows for an item to be added', async () => {
    render(
      <AddItem
        currentId={currentId}
        setCurrentId={setCurrentId}
        setNeedsUpdate={setNeedsUpdate}
      ></AddItem>
    );

    await userEvent.type(screen.getByTestId('textarea'), description);
    await userEvent.click(screen.getByText('Add'));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/items',
      {
        body: `{"id":${currentId + 1},"description":"${description}"}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }
    );

    expect(setCurrentId).toHaveBeenCalledTimes(1);
    expect(setCurrentId).toHaveBeenCalledWith(2);
    expect(setNeedsUpdate).toHaveBeenCalledTimes(1);
    expect(setNeedsUpdate).toHaveBeenCalledWith(true);
  });
});
