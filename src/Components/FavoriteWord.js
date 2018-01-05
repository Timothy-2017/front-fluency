import React, { Component } from 'react';
import Note from './Note';
import { Card, Button } from 'semantic-ui-react';

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
    return (
      <div>
        <Card>
          <Card.Content>
            <Card.Header>
              {this.props.word !== this.props.translated ? this.toggleWord(this.props.translated, this.props.word) : this.props.word}
            </Card.Header>
            <Card.Description>
              {this.props.note ? this.props.note : ''}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={() => this.editNote()}>{this.props.note ? 'Edit Note' : 'Add Note'}</Button>
              <Button basic color='red' onClick={() => this.props.handleDelete(this.props.id)}>Delete Flashcard</Button>
            </div>
          </Card.Content>
        </Card>
          {this.state.showNote ? <Note note={this.props.note} id={this.props.id} addNote={this.props.addNote} word={this.props.word} translated={this.props.translated} clearForm={this.clearForm}/> : null}
      </div>
    )
  }
}

// {this.state.showNote ? <Note note={this.props.note ? this.props.note : 'Add Note'} id={this.props.id} addNote={this.props.addNote} word={this.props.word} translated={this.props.translated} clearForm={this.clearForm}/> : null}


export default FavoriteWord
