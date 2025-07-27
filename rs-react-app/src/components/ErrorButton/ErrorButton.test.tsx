import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import ErrorButton from './ErrorButton';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../ErrorBoundary';

describe('ErrorButton', () => {
  it('should show error button when error state is false', () => {
    render(<ErrorButton />);

    expect(screen.getByTestId('errorButton')).toBeInTheDocument();
    expect(screen.queryByText(/Something went wrong/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Reset Button')).not.toBeInTheDocument();
  });

  it('should throw error text when error error button is clicked', async () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const errorButton = screen.getByTestId('errorButton');
    const user = userEvent.setup();
    await user.click(errorButton);

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText('Reset Button')).toBeInTheDocument();
  });
  it('should reset error state when reset button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const errorButton = screen.getByTestId('errorButton');
    await user.click(errorButton);

    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();

    const resetButton = screen.getByText('Reset Button');
    await user.click(resetButton);

    expect(screen.getByTestId('errorButton')).toBeInTheDocument();
    expect(screen.queryByText(/Something went wrong/)).not.toBeInTheDocument();
  });
});
