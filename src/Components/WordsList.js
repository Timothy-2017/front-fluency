import React from 'react';
import Word from './Word';

const WordsList = (props) => {
  // console.log(props);
  const wordMap = () => {
    return props.english_article.article_text.split(' ').map((word, i) => <Word word={word} translated={props.translated_article.split(' ')[i]} i={i} key={i} handleDoubleClick={props.handleDoubleClick}/>)
  }

  const url = () => {
    return <img src={props.english_article.article_url} alt="article_url" height="100px" width="100px"  />
  }

  return (
    <div>
      <h1>Article</h1>
      {props.translated_article ? url() : ''}
      <div>
        {props.translated_article ? wordMap() : ''}
      </div>
    </div>
  )
}

export default WordsList;
