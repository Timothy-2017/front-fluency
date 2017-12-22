// import React, { Component } from 'react';
// import ArticleNew from './ArticleNew';
// import ArticleDetail from './ArticleDetail';
//
//
// class ArticleContainer extends Component {
//
//   constructor() {
//     super();
//
//     this.state = {
//       article: '',
//       fetched_articles: [],
//       translated_article: '',
//       title: 'es',
//       display_article: ''
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChangeArticle = this.handleChangeArticle.bind(this);
//     this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
//     this.addArticle = this.addArticle.bind(this);
//   }
//
//   componentDidMount() {
//   fetch('http://localhost:3000/api/v1/articles')
//     .then(res => res.json())
//     .then(res => this.setState({
//       fetched_articles: res
//     }))
//   }
//
//   addArticle() {
//     fetch('http://localhost:3000/api/v1/articles', {
//       method: "POST",
//       headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'
//       },
//       // body: JSON.stringify(this.state)
//       body: JSON.stringify({
//         article: this.state.article,
//         title: this.state.title
//       })
//     })
//     .then(res => res.json())
//     // .then(res => console.log(res))
//     // .then(res => {debugger})
//     .then(res => this.setState({
//       display_article: res.description
//     }))
//     // .then((article) => {
//     //   this.setState(prevState => ({
//     //     fetched_articles: [...prevState.fetched_articles, article],
//     //     display_article: article.description
//     //   }))
//     // })
//   }
//
//   handleSubmit = e => {
//     e.preventDefault();
//     this.setState({
//       article: e.target.value
//     });
//     this.addArticle();
//     this.clearFields();
//   }
//
//   handleChangeArticle = e => {
//     this.setState({
//       article: e.target.value
//     });
//   }
//
//   handleChangeLanguage = e => {
//     this.setState({
//       title: e.target.value
//     });
//   }
//
//   clearFields = () => {
//     this.setState({
//       article: '',
//     })
//   }
//
//   render() {
//     return (
//       <div>
//         <ArticleNew
//           handleSubmit={this.handleSubmit}
//           handleChangeArticle={this.handleChangeArticle}
//           handleChangeLanguage={this.handleChangeLanguage}
//           article={this.state.article}
//           title={this.state.title}
//         />
//         <ArticleDetail
//           display_article={this.state.display_article}
//         />
//       </div>
//     )
//   }
// }
//
// export default ArticleContainer;

import React, { Component } from 'react';
import ArticleNew from './ArticleNew';
import ArticleDetail from './ArticleDetail';
import ArticleList from './ArticleList';

class ArticleContainer extends Component {

  constructor() {
    super();

    this.state = {
      article: '',
      fetched_articles: [],
      translated_article: '',
      title: '',
      language_id: 5,
      display_article: ''
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChangeArticle = this.handleChangeArticle.bind(this);
    // this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    // this.addArticle = this.addArticle.bind(this);
  }

  componentDidMount() {
  fetch('http://localhost:3000/api/v1/articles')
    .then(res => res.json())
    .then(res => {
      console.log(res)
      this.setState({
        display_article_id: res[0].id,
        fetched_articles: res
    }
      // fetched_articles: res.sort(function(a, b) {
      //     return b.id - a.id;
      //   }).slice(0, 10)
    )});
  }

  translate() {
    fetch('http://localhost:3000/api/v1/translations', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        display_article_id: this.state.display_article_id,
        language_id: this.state.language_id
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      this.setState({
      translated_article: res.translated_article
    })
  })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.translate();
  }

  // handleChangeArticle = e => {
  //   this.setState({
  //     article: e.target.value
  //   });
  // }

  handleChangeLanguage = e => {
    this.setState({
      language_id: e.target.value
    });
  }

  // clearFields = () => {
  //   this.setState({
  //     article: '',
  //   })
  // }

  render() {
    console.log("ARTICLE CONTAINER PROPS", this.props)
    console.log("ARTICLE CONTAINER STATE", this.state)
    return (
      <div>
        <ArticleNew
          handleSubmit={this.handleSubmit}
          // handleChangeArticle={this.handleChangeArticle}
          handleChangeLanguage={this.handleChangeLanguage}
          article={this.state.article}
          title={this.state.title}
        />
        <ArticleDetail
          display_article={this.state.display_article_id}
          translated_article={this.state.translated_article}
        />
        <ArticleList
          fetched_articles={this.state.fetched_articles}
        />
      </div>
    )
  }
}

export default ArticleContainer;
