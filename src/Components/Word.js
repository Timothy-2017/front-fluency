import React, { Component } from 'react';

class Word extends Component {

  constructor() {
    super();

    this.state = {
      clicked: true
    };
  }

  toggleWord = (translated, word) => { return <mark onClick={()=> this.setState({clicked: !this.state.clicked})} onDoubleClick={(e)=> this.props.handleDoubleClick(e, translated, word)}>{this.state.clicked ? this.props.translated : this.props.word} </mark>}

  render() {
    return (
      <span>
        {this.props.word !== this.props.translated ? this.toggleWord(this.props.translated, this.props.word) : this.props.word.concat(' ')}
      </span>
    )
  }
}

export default Word
