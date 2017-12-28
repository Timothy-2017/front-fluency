import React, { Component } from 'react';
import Word from './Word';

class WordsContainer extends Component {

  constructor() {
    super();

    this.state = {
      // language_id: "1",
      // english_article: {},
      // translated_article: ''
    };
    // this.wordMap = this.wordMap.bind(this)
  }



  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.translate();
  // }
  //
  // handleChangeLanguage = e => {
  //   this.setState({
  //     language_id: e.target.value
  //   });
  // }

  wordMap = () => {
    return this.props.english_article_description.split(' ').map((word, i) => <Word word={word} translated={this.props.translated_article.split(' ')[i]} i={i} key={i} />)
  }

  render() {
    // debugger
    // console.log("WordsContainer", this.props);
    return (
      <div>
        {this.props.english_article_description ? this.wordMap() : ''}
      </div>
    )
  }
}

export default WordsContainer;
