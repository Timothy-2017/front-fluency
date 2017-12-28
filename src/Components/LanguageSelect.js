import React from 'react';

const LanguageSelect = (props) => {
  return (
    <div>
      <h1>Select a Language</h1>
      <form onSubmit={(e) => props.handleSubmit(e)}>
        <label>
          Languages:
          <select
            value={props.language_id}
            onChange={(e) => props.handleChangeLanguage(e)}
          >
            <option value="1">Spanish</option>
            <option value="2">French</option>
            <option value="3">German</option>
            <option value="4">Italian</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LanguageSelect;
