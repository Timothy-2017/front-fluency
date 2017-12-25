import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import ArticleDetail from './ArticleDetail';


class ArticleContainer extends Component {

  constructor() {
    super();

    this.state = {
      translated_article: '',
      language_id: "1",
      english_article: {}
    };
  }

  componentDidMount() {
  fetch('http://localhost:3000/api/v1/articles')
    .then(res => res.json())
    .then(res => {
      // console.log("didMount", res[0])
      this.setState({
        english_article: res[0],
    })
    });
  }

  translate() {
    fetch('http://localhost:3000/api/v1/translations', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        english_article: this.state.english_article,
        language_id: this.state.language_id
      })
    })
    .then(res => res.json())
    .then(res => {
      // console.log(res)
      this.setState({
      translated_article: res.translated_article
    })
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.translate();
  }

  handleChangeLanguage = e => {
    this.setState({
      language_id: e.target.value
    });
  }

  render() {
    // console.log("ARTICLE CONTAINER PROPS", this.props)
    console.log("ARTICLE CONTAINER STATE", this.state)
    return (
      <div>
        <LanguageSelect
          handleSubmit={this.handleSubmit}
          handleChangeLanguage={this.handleChangeLanguage}
          language_id={this.state.language_id}
        />
        <ArticleDetail
          translated_article={this.state.translated_article}
        />
      </div>
    )
  }
}

export default ArticleContainer;
