import React, {Component} from 'react';
import Board from './components/Board'
import './App.css';
import Square from './components/Square';



export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      history:[],
      squares:Array(9).fill(null),
      isXNext:true// if its true, put x, false then O
    }
  }
  

  showPast = (item,idx)=>{
    this.setState({squares:item.squaresFromApp, isXNext:item.isXNext, history:this.state.history.filter((e,i)=>i<=idx)})
  }
  setTheState =(obj)=>{
    this.setState(obj)
  }
 
   
      render(){
        return (
        <div>
          <h1>Tic-tat-toe</h1>
          <ul>
            {this.state.history.map((item,idx)=>{
              return <li><button onClick={()=>this.showPast(item,idx)}>Move {idx+1}</button></li>
            })}
          </ul>
        <Board {...this.state} setTheState={this.setTheState}></Board>
      </div>
    );
  
      }
    
  }



  
 
   
    



