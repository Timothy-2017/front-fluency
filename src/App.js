import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux'
import ArticleContainer from './Components/ArticleContainer'
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ArticleContainer />
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return { items: state.items };
// };

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     addItem: addItem
//   }, dispatch);
// };

// export default connect(mapStateToProps, actions)(App);

export default App
