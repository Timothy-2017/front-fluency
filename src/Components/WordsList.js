import React from 'react';
import Word from './Word';

const WordsList = (props) => {
  // console.log(props);
  const wordMap = () => {
    return props.english_article_description.split(' ').map((word, i) => <Word word={word} translated={props.translated_article.split(' ')[i]} i={i} key={i} handleDoubleClick={props.handleDoubleClick}/>)
  }

  return (
    <div>
      <h1>Article</h1>
      {props.translated_article ? wordMap() : ''}
    </div>
  )
}

export default WordsList;
