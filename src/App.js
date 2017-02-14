import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      at: '',
      tokened: false,
    }
    this.updateState = this.updateState.bind(this)
    this.at = this.at.bind(this)
  }

  at() {
    let headers = {
      'Authorization': 'Bearer '  + this.state.at,
      'Access-Control-Allow-Origin': '*',
  }
      fetch('https://api.genius.com/artists/16775/songs', {
        method: "GET",
        headers: headers
      }).then(data => console.log('im data', data))
      console.log(headers)
  }

  updateState(e) {
      this.setState({at: e.target.value, tokened: true})
    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <input onChange={e => this.updateState(e)} value={this.state.at}></input>
          {this.state.tokened && <button onClick={this.at}>fetch</button>}
          </div>
      </div>
    );
  }
}

export default App;
