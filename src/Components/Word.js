import React, { Component } from 'react';

class Word extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clicked: true
    };
    // this.toggleWord = this.toggleWord.bind(this)
  }

  toggleWord = () => { return <p onClick={()=> this.setState({clicked: !this.state.clicked})}>{this.state.clicked ? this.props.translated : this.props.word} </p>}

  render() {
    // debugger
    console.log("props", this.props);
    console.log("state", this.state);
    return (
      <div>
        {this.props.word !== this.props.translated ? this.toggleWord() : this.props.word}
      </div>
    )
  }
}

export default Word
