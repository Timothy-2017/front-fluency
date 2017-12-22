import React from 'react';

const ArticleNew = (props) => {
  // console.log(props.article);
  return (
    <div>
      <h1>Submit an Article</h1>
      <form onSubmit={(e) => props.handleSubmit(e)} >
        <label>
          Article:
          <textarea
            type="text"
            placeholder={"Article Text Goes Here"}
            onChange={(e) => props.handleChangeArticle(e)}
            value={props.article}
          />
        </label>
        <label>
        Pick a language:
        <select
          onChange={(e) => props.handleChangeLanguage(e)}
          value={props.title}
        >
          <option value="1">Spanish</option>
          <option value="2">French</option>
          <option value="4">Italian</option>
          <option value="3">German</option>
        </select>
      </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ArticleNew;

  // onChange={(e) => props.handleChange(e)}
