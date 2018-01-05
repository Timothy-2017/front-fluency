import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

class Note extends Component {

  constructor(props) {
    super(props);

    this.state = {
      note: this.props.note
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = e => {
    this.setState({ note: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // debugger
    this.props.addNote(this.props.id, this.state.note, this.props.word, this.props.translated)
    this.props.clearForm() //
  }

  render() {
    // console.log("Note props", this.props);
    // console.log("Note from state", this.state.note);
    return (
      <div>
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Note</label>
          <input
            placeholder='Add Note Here'
            id="note"
            type="text"
            name="note"
            onChange={this.handleChange}
            value={this.state.note}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
      </div>
    )
  }
}

// <div>
//   <form onSubmit={this.handleSubmit} >
//     <input
//       id="note"
//       type="text"
//       name="note"
//       onChange={this.handleChange}
//       value={this.state.note}
//     />
//     <button type="submit">Submit</button>
//   </form>
// </div>

export default Note
