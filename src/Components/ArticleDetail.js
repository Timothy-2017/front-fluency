import React from 'react'

const ArticleDetail = (props) => {
  // console.log("ARTICLEDETAIL", props)
  return (
    <div>
      Translated Article:
      <p>{props.translated_article ? props.translated_article : ""}</p>
    </div>
  )
}

export default ArticleDetail
