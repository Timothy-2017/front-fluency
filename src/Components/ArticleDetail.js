import React from 'react'

const ArticleDetail = (props) => {
  // if (props.display_article) {
  //   console.log(props.display_article);
  // }

  return (
    <div>
      Translated Article:
      <p>{props.display_article ? props.display_article : "Submit an Article to See Translated Text"}</p>
    </div>
  )
}

export default ArticleDetail
