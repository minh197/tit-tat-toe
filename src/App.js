import React, { Component } from 'react';
import Board from './components/Board'
import './App.css';
import Square from './components/Square';

import FacebookLogin from 'react-facebook-login'; 



 


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

      history: [],
      squares: Array(9).fill(null),
      isXNext: true,// if its true, put x, false then O
      topRank: [],
      user : null// part to save user info make the user state to save our user info
    }
  }

   responseFacebook = (response) => {
   console.log("What is respnose", response);
    this.setState({ user: response.name }) // when we get the response from fb we will save the info into user state
  }



  showPast = (item, idx) => {
  console.log("item?", item)
  this.setState({ squares: item.squares.slice(), isXNext: item.isXNext, history: this.state.history.filter((e, i) => i <= idx) })
}
  setTheState = (obj) => {
  this.setState(obj)
}

  

  getData = async () => {
  let url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`
  let data = await fetch(url)
  let result = await data.json()
  console.log("what is reslut", result)
  this.setState({ ...this.state, topRank: result.items })
  
  }


  //render the data
componentDidMount() {
  this.getData(); 
}
  

  render() {
  if(this.state.user === null){
     return ( 
       < FacebookLogin
    autoLoad = { true}
    appId = "4153252274686681"
    fields = "name,email,picture"
    callback = {(resp) => this.responseFacebook(resp)
  } /> 
 
      )   
}
    return (
   <div>
    <h1>Tic-tat-toe</h1>
    

    <h2>User info: {this.state.user}</h2> 


    <ul>
      {console.log("history have", this.state.history)}
      {this.state.history.map((item, idx) => {
        return <li><button onClick={() => this.showPast(item, idx)}>Move {idx + 1}</button></li>
      })}
    </ul>
    <div>
      <h2>Top Rank</h2>
      <div>{this.state.topRank.map(item => { return <div>{item.player}:{item.score}</div> })}</div>
      <div>

      </div>
    </div>

    <Board {...this.state} setTheState={this.setTheState} userName={this.state.user} ></Board>
  </div>
); 

  }
 
}










