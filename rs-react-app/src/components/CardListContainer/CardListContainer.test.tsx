import { render, screen } from '@testing-library/react';
import { it, expect, describe, beforeEach, vi, afterEach } from 'vitest';
import CardListContainer, { RepoParams } from './CardListContainer';

const mockData: RepoParams[] = [
  {
    id: 1,
    full_name: 'react',
    clone_url: 'url.com',
    description: 'some description',
    stargazers_count: 23465,
  },
  {
    id: 2,
    full_name: 'angular',
    clone_url: 'url.com',
    description: 'some description',
    stargazers_count: 4763,
  },
];

const mockFetch = vi.fn();
beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('CardLIsContainer', () => {
  it('should show Loader component initially', () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          totalc_count: 0,
          incomplite_results: false,
          items: [],
        }),
    });

    render(<CardListContainer searchQuery="react" />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should show error if returned error', async () => {
    mockFetch.mockRejectedValue(new Error('Network Error'));

    render(<CardListContainer searchQuery="react" />);
    const errorMessage = await screen.findByText('Network Error');
    expect(errorMessage).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('should show no results if fetched data is empty array', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () =>
        Promise.resolve({
          totalc_count: 0,
          incomplite_results: false,
          items: [],
        }),
    });

    render(<CardListContainer searchQuery="react" />);

    const noResultsMessage = await screen.findByText('No results found!');
    expect(noResultsMessage).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });

  it('should show CardList component after succesfull response', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () =>
        Promise.resolve({
          totalc_count: 0,
          incomplete_results: false,
          items: mockData,
        }),
    });

    render(<CardListContainer searchQuery="react" />);

    const result = await screen.findAllByTestId('card-item');
    expect(result).toHaveLength(mockData.length);
    expect(screen.getByTestId('errorButton')).toBeInTheDocument();
    expect(screen.queryByText('No results found!')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });
});
