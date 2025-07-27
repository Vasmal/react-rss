import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import Main from './Main';

describe('Main', () => {
  render(<Main />);
  it('should render all child components', () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByTestId('search')).toBeInTheDocument();
  });
  it('should render header content', () => {
    render(<Main />);

    expect(
      screen.getByText('Here you can find any repo from the GitHub.')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Search repositories by name or topic/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Try: 'javascript framework'/)).toBeInTheDocument();
  });
});
