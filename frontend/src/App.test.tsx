/* eslint-disable @typescript-eslint/no-unused-expressions */
import App from './App';
import { render, screen } from '@testing-library/react';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ id: 1, description: 'to do item' }]),
    } as unknown as Response)
  );
});

afterEach(() => {
  (global.fetch as jest.Mock).mockClear();
});

describe('App', () => {
  it('Renders a list of Items', async () => {
    render(<App></App>);
    expect(screen.findByText('My to-do list')).toBeTruthy;
    expect(screen.findByText('to do item')).toBeTruthy;
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/items'
    );
  });
});
