import React from 'react'
import { Item } from 'semantic-ui-react'
import Word from './Word';

const ItemExampleDescriptions = (props) => {

  const wordMap = () => {
    return props.english_article.split(' ').map((word, i) => <Word word={word} translated={props.translated_article.split(' ')[i]} i={i} key={i} handleDoubleClick={props.handleDoubleClick}/>)
  }

  return (
    <Item.Group>
      <Item>
        <Item.Image size='small' src={props.article_url} />

        <Item.Content>

          <Item.Description>
            <p>{props.translated_article ? wordMap() : null}</p>

          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default ItemExampleDescriptions
