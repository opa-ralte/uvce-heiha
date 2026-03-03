import { render, screen } from '@testing-library/react';
import App from './App';

test('renders UVCE HEIHA heading', () => {
  render(<App />);
  const heading = screen.getByText(/UVCE HEIHA/i);
  expect(heading).toBeInTheDocument();
});
