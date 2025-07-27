import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RepoParams } from '../CardListContainer/CardListContainer';
import CardItem from './CardItem';

describe('CardItem', () => {
  const props: RepoParams = {
    id: 1,
    full_name: 'react',
    clone_url: 'url.com',
    homepage: 'home.com',
    description: 'some description',
    language: 'js',
    stargazers_count: 23465,
  };

  it('should rendser component with props', () => {
    render(<CardItem {...props} />);

    expect(screen.getByRole('heading')).toHaveTextContent(props.full_name);
    expect(screen.getByRole('paragraph')).toHaveTextContent(
      props.description ?? ''
    );
    expect(screen.getByRole('link', { name: /repo/i })).toHaveAttribute(
      'href',
      props.clone_url
    );
    expect(screen.getByRole('link', { name: /homepage/i })).toHaveAttribute(
      'href',
      props.homepage
    );
    expect(screen.getByText(props.language ?? '')).toBeInTheDocument();
    expect(screen.getByText(props.stargazers_count)).toBeInTheDocument();
  });

  it('should not render elements with unnecesary props', () => {
    const defaultProps: RepoParams = {
      id: 1,
      full_name: 'react',
      clone_url: 'url.com',
      description: 'some description',
      stargazers_count: 23465,
    };
    render(<CardItem {...defaultProps} />);

    expect(
      screen.queryByRole('link', { name: /homepage/i })
    ).not.toBeInTheDocument();
  });
});
