import Search from '../Search/Search';
import { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import styles from './Main.module.css';
import CardListContainer from '../CardListContainer/CardListContainer';

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
      <div className={styles.container}>
        <header>
          <h1>Here you can find any repo from the GitHub.</h1>
          <p>
            Search repositories by name or topic and select your preferred one
          </p>
          <p className={styles.search_examples}>
            {`Try: 'javascript framework', 'python bot', 'mobile game', or any
            tech stack`}
          </p>
          <Search
            searchQuery={this.state.searchQuery || ''}
            onButtonClick={this.handleStateChange}
          />
        </header>
        <main>
          <ErrorBoundary>
            <CardListContainer searchQuery={this.state.searchQuery || ''} />
          </ErrorBoundary>
        </main>
      </div>
    );
  }
}
