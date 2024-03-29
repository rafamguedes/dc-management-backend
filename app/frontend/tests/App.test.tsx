import { render, screen } from '@testing-library/react';
import App from '../src/App';

it('should show hello world', () => {
  render(<App />);
  expect(screen.getByText('Hello, World!')).toBeInTheDocument();
})