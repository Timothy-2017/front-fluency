import React from 'react';
// import { Link } from 'react-router-dom';

const ArticleList = (props) => {
  // console.log(props);
  return (
    <div>
      {props.fetched_articles.map(article => <div key={article.id}><p>{article.title}</p><p>{article.description}</p></div>)}
    </div>
  )
}

export default ArticleList
