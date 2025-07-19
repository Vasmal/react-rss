import Search from './Search';
import { Component } from 'react';
import CardList from './CardList';
import ErrorBoundary from './ErrorBoundary';

export type RepoParams = {
  id: number;
  full_name: string;
  clone_url: string;
  description: string;
  homepage?: string;
  language?: string;
  stargazers_count: number;
};

type StateParams = {
  searchQuery: string | null;
};

export default class Main extends Component {
  state: StateParams = {
    searchQuery: localStorage.getItem('searchQuery') || null,
  };

  handleStateChange = (value: string) => {
    this.setState({
      searchQuery: value,
    });
  };

  render() {
    return (
      <div className="container">
        <header>
          <Search
            searchQuery={this.state.searchQuery || ''}
            onButtonClick={this.handleStateChange}
          />
        </header>
        <main>
          <ErrorBoundary>
            <CardList searchQuery={this.state.searchQuery || ''} />
          </ErrorBoundary>
        </main>
      </div>
    );
  }
}
