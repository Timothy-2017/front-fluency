import React, { Component } from 'react';
import WordsList from './WordsList';
import FavoriteWordsList from './FavoriteWordsList';
import DropdownSimple from './DropdownSimple';
import ItemExampleDescriptions from './ItemExampleDescriptions';
import HeaderExample from './HeaderExample';
import { Grid} from 'semantic-ui-react';

class ArticleContainer extends Component {

  constructor() {
    super();

    this.state = {
      english_articles: [],
      user_id: "1",
      favoriteWords: [],
      englishTranslated: []
    };
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
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

  translate(art, value) {
    fetch('http://localhost:3000/api/v1/translations', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        english_article: art.article_text,
        language_id: value
      })
    })
    .then(res => res.json())
    .then(res => {
      this.setState(prevState => ({
        englishTranslated: [...prevState.englishTranslated, {article_url: art.article_url, english_article: art.article_text, translated_article: res.translated_article}]
      }))
    })
  }


  handleChangeLanguage = (e, value) => {
    e.preventDefault();
    this.setState({
      englishTranslated: []
    });
    this.state.english_articles.map((art) => (
      this.translate(art, value)
    ))
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

  TwoEnglishTranslatedList() {
    return this.state.englishTranslated.map((art, i) => (
      <ItemExampleDescriptions
        english_article={art.english_article}
        article_url={art.article_url}
        translated_article={art.translated_article}
        handleDoubleClick={this.handleDoubleClick}
        key={i}
      />
    ));
  }

  render() {
    return (
      <div>
        <HeaderExample />
        <DropdownSimple
          handleChangeLanguage={this.handleChangeLanguage}
        />
        <Grid>
          <Grid.Column width={12}>
            <h2>Articles</h2>
            <h3>Click on a highlighted word to view its translation. Double-click to create a flashcard.</h3>
            {this.state.englishTranslated.length !== 0 ? this.TwoEnglishTranslatedList() : null}
          </Grid.Column>
          <Grid.Column width={4}>
            <FavoriteWordsList
              favoriteWords={this.state.favoriteWords}
              handleDelete={this.handleDelete}
              addNote={this.addNote}
            />
          </Grid.Column>
        </Grid>

      </div>
    )
  }
}

// {this.state.englishTranslated.length !== 0 ? this.englishTranslatedList() : null}

export default ArticleContainer;
