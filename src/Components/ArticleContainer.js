import React, { Component } from 'react';
import ArticleNew from './ArticleNew';
import ArticleDetail from './ArticleDetail';


class ArticleContainer extends Component {

  constructor() {
    super();

    this.state = {
      article: '',
      fetched_articles: [],
      translated_article: '',
      title: 'es',
      display_article: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeArticle = this.handleChangeArticle.bind(this);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.addArticle = this.addArticle.bind(this);
  }

  componentDidMount() {
  fetch('http://localhost:3000/api/v1/articles')
    .then(res => res.json())
    .then(res => this.setState({
      fetched_articles: res
    }))
  }

  addArticle() {
    fetch('http://localhost:3000/api/v1/articles', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(this.state)
      body: JSON.stringify({
        article: this.state.article,
        title: this.state.title
      })
    })
    .then(res => res.json())
    .then((article) => {
      this.setState(prevState => ({
        fetched_articles: [...prevState.fetched_articles, article],
        display_article: article.text
      }))
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      article: e.target.value
    });
    this.addArticle();
    this.clearFields();
  }

  handleChangeArticle = e => {
    this.setState({
      article: e.target.value
    });
  }

  handleChangeLanguage = e => {
    this.setState({
      title: e.target.value
    });
  }

  clearFields = () => {
    this.setState({
      article: '',
    })
  }

  render() {
    return (
      <div>
        <ArticleNew
          handleSubmit={this.handleSubmit}
          handleChangeArticle={this.handleChangeArticle}
          handleChangeLanguage={this.handleChangeLanguage}
          article={this.state.article}
          title={this.state.title}
        />
        <ArticleDetail
          display_article={this.state.display_article}
        />
      </div>
    )
  }
}

export default ArticleContainer;
