import { Component } from 'react';
import styles from './Search.module.css';

type Props = {
  searchQuery: string;
  onButtonClick: (value: string) => void;
};

type State = {
  input: string;
};

class Search extends Component<Props, State> {
  state: State = {
    input: this.props.searchQuery,
  };

  handleClick = (value: string) => {
    const trimedValue = value.trim();
    if (!trimedValue) {
      return;
    }
    this.props.onButtonClick(trimedValue);
    if (trimedValue !== localStorage.getItem('searchQuery')) {
      localStorage.setItem('searchQuery', trimedValue);
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <input
          className={styles.search_field}
          type="text"
          placeholder="Search repositories..."
          value={this.state.input}
          onChange={(e) => this.setState({ input: e.target.value })}
        />
        <button
          className={styles.search_button}
          onClick={() => this.handleClick(this.state.input)}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
