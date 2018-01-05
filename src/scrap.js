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
      <Button basic color='red' onClick={() => this.props.handleDelete(this.props.id)}>Delete</Button>
    </div>
  </Card.Content>
</Card>
/////////////////////////////////////////////////
<button type="submit" ></button>

<button ></button>
