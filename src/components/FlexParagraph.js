import React, { Component } from 'react';

class FlexParagraph extends Component {
  state = {
    displayLess: true,
  }

  handleModeChange = (e) => {
    this.setState({ displayLess: !this.state.displayLess });
  }

  render() {
    const { text } = this.props;
    const limitLength = 150;
    if (this.state.displayLess) {
      if (text.length > limitLength) {
        return (
          <p>{text.substring(0, limitLength)}
            <button onClick={this.handleModeChange}>
              ...more
            </button>
          </p>
        );
      } else {
        return (<p>{text}</p>);
      }
    } else {
      return (
        <p>{text} <button onClick={this.handleModeChange}>(less)</button></p>
      );
    }
  }
}

export default FlexParagraph;
