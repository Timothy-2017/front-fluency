import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import ArticleDetail from './ArticleDetail';


class ArticleContainer extends Component {

  constructor() {
    super();

    this.state = {
      translated_article: '',
      language: '',
      language_id: 5,
      // display_article: ''
      english_article: {}
    };
  }

  componentDidMount() {
  fetch('http://localhost:3000/api/v1/articles')
    .then(res => res.json())
    .then(res => {
      // console.log("didMount", res[0])
      this.setState({
        // display_article_id: res[0].id,
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
        // display_article_id: this.state.display_article_id,
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
    // console.log("ARTICLE CONTAINER STATE", this.state)
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

// language={this.state.language}

export default ArticleContainer;
