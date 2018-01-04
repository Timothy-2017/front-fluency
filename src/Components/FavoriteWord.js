import React, { Component } from 'react';
import Note from './Note';
import { Card } from 'semantic-ui-react';

class FavoriteWord extends Component {

  constructor() {
    super();

    this.state = {
      clicked: true,
      showNote: false
    };
    this.editNote = this.editNote.bind(this)
    this.clearForm = this.clearForm.bind(this)
  }

  toggleWord = () => { return <p onClick={()=> this.setState({clicked: !this.state.clicked})}>{this.state.clicked ? this.props.translated : this.props.word} </p>}

  editNote = () => {
    this.setState({
      showNote: true,
    });
  }

  clearForm = () => {
    this.setState({
      showNote: false
    })
  }

  render() {
    // console.log("FavoriteWord props", this.props);
    return (
      <div>
        {this.state.showNote ? <Note note={this.props.note ? this.props.note : 'Add Note'} id={this.props.id} addNote={this.props.addNote} word={this.props.word} translated={this.props.translated} clearForm={this.clearForm}/> : null}
        <Card
          header={this.props.word !== this.props.translated ? this.toggleWord(this.props.translated, this.props.word) : this.props.word}
          description={this.props.note ? this.props.note : ''}
        />
        <button type="submit" onClick={() => this.editNote()}>{this.props.note ? 'Edit Note' : 'Add Note'}</button>
        <button onClick={() => this.props.handleDelete(this.props.id)}>Delete</button>
        <h1> </h1>
      </div>
    )
  }
}

export default FavoriteWord

// return (
//   <div>
//     {this.props.word !== this.props.translated ? this.toggleWord(this.props.translated, this.props.word) : this.props.word}
//     <button onClick={() => this.props.handleDelete(this.props.id)}>Delete</button>
//
//     <div>{this.props.note ? this.props.note : ''}</div>
//
//     <button type="submit" onClick={() => this.editNote()} >
//     {this.props.note ? 'Edit Note' : 'Add Note'}
//
//     </button>
//     {this.state.showNote ? <Note note={this.props.note ? this.props.note : 'Add Note'} id={this.props.id} addNote={this.props.addNote} word={this.props.word} translated={this.props.translated} clearForm={this.clearForm}/> : null}
//     <Card
//       header={this.props.word !== this.props.translated ? this.toggleWord(this.props.translated, this.props.word) : this.props.word}
//       description={this.props.note ? this.props.note : ''}
//     />
//   </div>
// )
