import React, { Component } from 'react';

class Word extends Component {

  constructor() {
    super();

    this.state = {
      clicked: true
    };
  }

  toggleWord = () => { return <p onClick={()=> this.setState({clicked: !this.state.clicked})}>{this.state.clicked ? this.props.translated : this.props.word} </p>}

  render() {
    // console.log("Word", this.props);
    return (
      <div>
        {this.props.word !== this.props.translated ? this.toggleWord() : this.props.word}
      </div>
    )
  }
}

export default Word
