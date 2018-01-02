import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import WordsList from './WordsList';
import FavoriteWordsList from './FavoriteWordsList';

class ArticleContainer extends Component {

  constructor() {
    super();

    this.state = {
      language_id: "1",
      english_article: '',
      english_articles: [],
      translated_article: '',
      user_id: "1",
      favoriteWords: []
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/favorites')
      .then(res => res.json())
      .then(res => {
        // debugger})
        // console.log("didMount favorites", res)})
        this.setState({
          favoriteWords: res.filter(favorite => favorite.user_id === parseInt(this.state.user_id, 10)).sort(function(a, b) {
          return a.id - b.id;
        })
      })
      })
    fetch('http://localhost:3000/api/v1/articles')
      .then(res => res.json())
      .then(res => {
        // debugger
        // console.log("didMount", res[0])
        this.setState({
          // english_article: res[0],
          english_articles: res,
          // english_article: res[Math.floor(Math.random() * this.state.english_articles.length)]
      })
      });
  }

  // this.setState({
  //   english_article: this.state.english_articles[Math.floor(Math.random() * this.state.english_articles.length)]
  // })

  translate() {
    let newArticle = this.state.english_articles[Math.floor(Math.random() * this.state.english_articles.length)]
    // let newArticle = this.state.english_articles[0]
    fetch('http://localhost:3000/api/v1/translations', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        english_article: newArticle.article_text,
        language_id: this.state.language_id
      })
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
      translated_article: res.translated_article,
      english_article: newArticle
    })
    })
    // .then(res => {console.log(res)})
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
    // console.log("id", id);
    // console.log("note", note);
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
    // console.log("ARTICLE CONTAINER PROPS", this.props)
    // console.log("english_articles", this.state.english_articles)
    console.log("english_article", this.state.english_article)
    console.log("translated_article", this.state.translated_article)
    console.log('-------------------------------------------------');

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
          english_article={this.state.english_article}
          handleDoubleClick={this.handleDoubleClick}
        />
        <FavoriteWordsList
          favoriteWords={this.state.favoriteWords}
          handleDelete={this.handleDelete}
          addNote={this.addNote}
        />
      </div>
    )
  }
}

export default ArticleContainer;

// <WordsList
//   translated_article={this.state.translated_article}
//   english_article_description={this.state.english_article.description}
//   handleDoubleClick={this.handleDoubleClick}
// />
