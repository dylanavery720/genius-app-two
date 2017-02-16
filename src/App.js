import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const request = require('request');
const $ = require('jquery')

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
      url: 'https://api.genius.com/artists/16775/songs',
      headers: {
      Authorization: 'J3DuqYmVBrbPPQetLIX_1CnV0b0p6SeyFtPOsvHEKXtS1DTD5XRRBdHm0Zetqu3f',
      Accept: 'application/json',
    }
  }
      fetch('https://api.genius.com/artists/16775/songs', {
        headers: {
        Authorization: 'Bearer J3DuqYmVBrbPPQetLIX_1CnV0b0p6SeyFtPOsvHEKXtS1DTD5XRRBdHm0Zetqu3f',
        Accept: 'application/json',
      }
    })
      .then(data => console.log('im data', data))
        .catch(err => console.log(err))
      console.log(headers)
      // $.ajax({
      //   'Type': 'GET',
      //   'url': 'https://api.genius.com/artists/16775/songs',
      //   'Authorization': 'Bearer NiyyFNs6muUxFv-7gOwGHYzJm0-Qv7p-9xmB8NmuqG2-rU76QHnvK9SQc9hCnQzv',
      //   'Accept': 'application/json',
      //   success: (data) => {
      //     console.log(data)
      //   },
      //   error: (error) => {
      //     console.log(error)
      //   }
      // })
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
