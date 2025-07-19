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
    const trimedValue = value.trim();
    this.props.onButtonClick(trimedValue);
    if (trimedValue !== localStorage.getItem('searchQuery')) {
      localStorage.setItem('searchQuery', trimedValue);
    }
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
