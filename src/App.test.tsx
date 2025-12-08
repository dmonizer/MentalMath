import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Pranglimine/i);
  expect(linkElement).toBeInTheDocument();
});
