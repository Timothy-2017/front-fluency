import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const FormExampleForm = () => (
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
    <button type="submit">Submit</button>
  </Form>
)

export default FormExampleForm
