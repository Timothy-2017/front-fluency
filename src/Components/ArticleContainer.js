import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import WordsList from './WordsList';
import FavoriteWordsList from './FavoriteWordsList';

class ArticleContainer extends Component {

  constructor() {
    super();

    this.state = {
      language_id: "1",
      english_article: {},
      translated_article: '',
      user_id: "1",
      favoriteWords: []
    };
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
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
    fetch('http://localhost:3000/api/v1/favorites')
      .then(res => res.json())
      .then(res => {
        // debugger})
        // console.log("didMount favorites", res)})
        this.setState({
          favoriteWords: res.filter(favorite => favorite.user_id === parseInt(this.state.user_id, 10))
      })
      })
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

  handleDoubleClick = (e, translated, word) => {
    // console.log(e)
    // console.log(translated)
    // console.log(word)
    // console.log(this.state.user_id)
    // debugger
    fetch('http://localhost:3000/api/v1/favorites', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: this.state.user_id, translatedWord: translated})
      })
      .then(res => res.json())
      .then((favorite) => {
        this.setState(prevState => ({
          favoriteWords: [...prevState.favoriteWords, {word: word, translated: translated, user_id: this.state.user_id}]
        }))
      })
  }

  render() {
    // console.log("ARTICLE CONTAINER PROPS", this.props)
    // console.log("ARTICLE CONTAINER STATE", this.state)
    // debugger
    return (
      <div>
        <LanguageSelect
          handleSubmit={this.handleSubmit}
          handleChangeLanguage={this.handleChangeLanguage}
          language_id={this.state.language_id}
        />
        <WordsList
          translated_article={this.state.translated_article}
          english_article_description={this.state.english_article.description}
          handleDoubleClick={this.handleDoubleClick}
        />
        <FavoriteWordsList
          favoriteWords={this.state.favoriteWords}
        />
      </div>
    )
  }
}

export default ArticleContainer;
