import { Component } from 'react';

class ErrorButton extends Component {
  state = {
    isError: false,
  };

  handleClick = () => {
    this.setState({ isError: true });
  };

  render() {
    const { isError } = this.state;
    if (isError) {
      throw new Error('An error occured due to Error Button click');
    }

    return <button onClick={this.handleClick}>Error Button</button>;
  }
}

export default ErrorButton;
