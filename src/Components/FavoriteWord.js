import React, { Component } from 'react';

class FavoriteWord extends Component {

  constructor() {
    super();

    this.state = {
      clicked: true
    };
  }

  toggleWord = () => { return <p onClick={()=> this.setState({clicked: !this.state.clicked})}>{this.state.clicked ? this.props.translated : this.props.word} </p>}

  render() {
    // console.log("FavoriteWord props", this.props.id);
    return (
      <div>
        {this.props.word !== this.props.translated ? this.toggleWord(this.props.translated, this.props.word) : this.props.word}
        <button onClick={() => this.props.handleDelete(this.props.id)}>Delete</button>
      </div>
    )
  }
}

export default FavoriteWord
