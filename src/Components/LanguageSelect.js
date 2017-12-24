// import React from 'react';
//
// const ArticleNew = (props) => {
//   // console.log(props.article);
//   return (
//     <div>
//       <h1>Submit an Article</h1>
//       <form onSubmit={(e) => props.handleSubmit(e)} >
//         <label>
//           Article:
//           <textarea
//             type="text"
//             placeholder={"Article Text Goes Here"}
//             onChange={(e) => props.handleChangeArticle(e)}
//             value={props.article}
//           />
//         </label>
//         <label>
//         Pick a language:
//         <select
//           onChange={(e) => props.handleChangeLanguage(e)}
//           value={props.title}
//         >
//           <option value="1">Spanish</option>
//           <option value="2">French</option>
//           <option value="3">German</option>
//           <option value="4">Italian</option>
//         </select>
//       </label>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   )
// }
//
// export default ArticleNew;
//

import React from 'react';

const LanguageSelect = (props) => {
  console.log(props);
  return (
    <div>
      <h1>Select a Language</h1>
      <form onSubmit={(e) => props.handleSubmit(e)} >

        <label>
        Languages:
        <select
          onChange={(e) => props.handleChangeLanguage(e)}
          value={props.language_id}
        >
          <option value="5">English</option>
          <option value="1">Spanish</option>
          <option value="2">French</option>
          <option value="3">German</option>
          <option value="4">Italian</option>
        </select>
      </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LanguageSelect;
