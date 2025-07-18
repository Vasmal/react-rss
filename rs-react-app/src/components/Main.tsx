import Search from './Search';
import { Component } from 'react';
import getData from '.././features/get-data';

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

  componentDidMount(): void {
    getData();
  }

  render() {
    return (
      <>
        <header>
          <Search
            searchQuery={this.state.searchQuery || ''}
            onButtonClick={this.handleStateChange}
          />
        </header>
      </>
    );
  }
}
