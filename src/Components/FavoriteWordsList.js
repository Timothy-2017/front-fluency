import React from 'react';
import FavoriteWord from './FavoriteWord';

const FavoriteWordsList = (props) => {

  // console.log(props);
  const favoriteWordMap = () => {
    return props.favoriteWords.map((favorite, i) => <FavoriteWord word={favorite.word} translated={favorite.translated} note={favorite.note} handleDelete={props.handleDelete} id={favorite.id} key={i} noteComponent={props.noteComponent} addNote={props.addNote}/>)
  }

  return (
    <div>
      <h1>Words to Practice</h1>
      {props.favoriteWords.length > 0 ? favoriteWordMap() : ''}
    </div>
  )
}

export default FavoriteWordsList;
