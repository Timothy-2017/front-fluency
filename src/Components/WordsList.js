import React from 'react';
import Word from './Word';

const WordsList = (props) => {

  const wordMap = () => {
    return props.english_article_description.split(' ').map((word, i) => <Word word={word} translated={props.translated_article.split(' ')[i]} i={i} key={i} />)
  }

  return (
    <div>
      {props.translated_article ? wordMap() : ''}
    </div>
  )
}

export default WordsList;
