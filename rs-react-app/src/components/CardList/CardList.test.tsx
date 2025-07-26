import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import { RepoParams } from '../CardListContainer/CardListContainer';
import CardList from './CardList';

describe('CardList', () => {
  it('should render card items with provided props', () => {
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
    render(<CardList repos={mockData} />);

    const cardItems = screen.getAllByTestId('card-item');
    expect(cardItems).toHaveLength(mockData.length);

    cardItems.forEach((card, index) => {
      expect(card).toHaveTextContent(mockData[index].full_name);
    });
  });
});
