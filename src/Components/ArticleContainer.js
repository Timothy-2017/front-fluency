import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import WordsList from './WordsList';
import FavoriteWordsList from './FavoriteWordsList';

class ArticleContainer extends Component {

  constructor() {
    super();

    this.state = {
      language_id: "1",
      english_articles: [],
      user_id: "1",
      favoriteWords: [],
      englishTranslated: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/favorites')
      .then(res => res.json())
      .then(res => {
        this.setState({
          favoriteWords: res.filter(favorite => favorite.user_id === parseInt(this.state.user_id, 10)).sort(function(a, b) {
          return a.id - b.id;
        })
      })
      })
    fetch('http://localhost:3000/api/v1/articles')
      .then(res => res.json())
      .then(res => {
        this.setState({
          english_articles: res,
      })
      });
  }

  englishTranslatedList() {
    return this.state.englishTranslated.map((art, i) => (
       <WordsList
        english_article={art.english_article}
        article_url={art.article_url}
        translated_article={art.translated_article}
        handleDoubleClick={this.handleDoubleClick}
        key={i}
      />
    ));
  }

  translate(art) {
    fetch('http://localhost:3000/api/v1/translations', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        english_article: art.article_text,
        language_id: this.state.language_id
      })
    })
    .then(res => res.json())
    .then(res => {
      this.setState(prevState => ({
        englishTranslated: [...prevState.englishTranslated, {article_url: art.article_url, english_article: art.article_text, translated_article: res.translated_article}]
      }))
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.state.english_articles.map(art => (
      this.translate(art)
    ))
  }

  handleChangeLanguage = e => {
    this.setState({
      language_id: e.target.value,
      englishTranslated: []
    });
  }

  handleDoubleClick = (e, translated, word) => {
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
          favoriteWords: [...prevState.favoriteWords, {word: word, translated: translated, user_id: this.state.user_id, id: favorite.id}]
        }))
      })
  }

  addNote = (id, note, word, translated) => {
    fetch(`http://localhost:3000/api/v1/favorites/${id}`, {
      method: "PUT",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: JSON.stringify({id: id, note: note})
      })
      .then(res => res.json())
      .then(favorite => {
        this.setState(prevState => ({
          favoriteWords: [...prevState.favoriteWords.filter(fave => { return fave.id !== id}), {word: word, translated: translated, user_id: favorite.user_id, id: favorite.id, note: favorite.note}].sort(function(a, b) {
          return a.id - b.id;
        })
        }))
      })
  }

  handleDelete = (id) => {
    fetch(`http://localhost:3000/api/v1/favorites/${id}`, {
      method: "DELETE",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      }
      })
      .then((favorite) => {
        this.setState(prevState => ({
          favoriteWords: this.state.favoriteWords.filter(word => word.id !== id)
        }))
      })
  }

  render() {
    return (
      <div>
        <LanguageSelect
          handleSubmit={this.handleSubmit}
          handleChangeLanguage={this.handleChangeLanguage}
          language_id={this.state.language_id}
        />
        <FavoriteWordsList
          favoriteWords={this.state.favoriteWords}
          handleDelete={this.handleDelete}
          addNote={this.addNote}
        />
        {this.state.englishTranslated.length !== 0 ? this.englishTranslatedList() : null}
      </div>
    )
  }
}

export default ArticleContainer;
