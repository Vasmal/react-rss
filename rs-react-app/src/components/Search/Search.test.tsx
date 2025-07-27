import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import Search from './Search';

describe('Search', () => {
  const mockOnButtonClick = vi.fn();
  const defaultProps = {
    searchQuery: '',
    onButtonClick: mockOnButtonClick,
  };

  const searchQuery = 'react';
  it('should render component with basic props', () => {
    render(<Search {...defaultProps} />);

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should render input with searchQueryProp', () => {
    render(
      <Search searchQuery={searchQuery} onButtonClick={mockOnButtonClick} />
    );

    expect(screen.getByRole('textbox')).toHaveValue();
  });

  it('should call a function when button is clicked', async () => {
    render(
      <Search searchQuery={searchQuery} onButtonClick={mockOnButtonClick} />
    );

    const button = screen.getByRole('button', { name: /search/i });
    const user = userEvent.setup();
    await user.click(button);
    expect(mockOnButtonClick).toBeCalled();
  });
});
