import React from 'react';
import Word from './Word';

const WordsList = (props) => {


  const wordMap = () => {
    return props.english_article.split(' ').map((word, i) => <Word word={word} translated={props.translated_article.split(' ')[i]} i={i} key={i} handleDoubleClick={props.handleDoubleClick}/>)
  }

  const url = () => {
    return <img src={props.article_url} alt="article_url" height="100px" width="100px"  />
  }

  return (
    <div>
      <h1>Article</h1>
      {props.article_url ? url() : null}
      <div>
        {props.translated_article ? wordMap() : null}
      </div>
    </div>
  )
}

export default WordsList;
