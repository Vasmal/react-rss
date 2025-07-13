import Header from './components/Header';
import Main from './components/Main';
import { Component } from 'react';

type StateParams = {
  searchQuery: string | null;
};

export default class App extends Component {
  state: StateParams = {
    searchQuery: localStorage.length
      ? localStorage.getItem('searchQuery')
      : null,
  };

  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}
