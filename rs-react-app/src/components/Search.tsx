import { Component } from 'react';

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
    this.props.onButtonClick(value);
    this.setItem(value);
  };

  setItem = (value: string) => {
    localStorage.setItem('searchQuery', value);
  };
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.input}
          onChange={(e) => this.setState({ input: e.target.value })}
        />
        <button onClick={() => this.handleClick(this.state.input)}>Add</button>
      </div>
    );
  }
}

export default Search;
