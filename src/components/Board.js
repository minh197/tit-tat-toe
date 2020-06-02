import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {

    renderSquare=(num)=>{
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]} />
        
    
      };
      //compare the squareFromApp
      calculateWinner =(squares)=>{

        
        const lines = [
            [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++){
            const [a, b, c] = lines[i]; 
          // create a new array with the same values as each winning combo. i.e. when i = 0 the new array of [a, b, c] is [0, 1, 2]
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
          }
        }
       
       
        return null;
        

      }


      
      boxClick= (id)=>{
          console.log("You click",id )
          //change the value from null to x at the array index number id

        let squaresFromApp = this.props.squares
        console.log("Squares you got so far is", squaresFromApp);
        squaresFromApp[id]=this.props.isXNext? 'X' : 'O'
        console.log("After changes", squaresFromApp);
        // this.setState({squares:squaresFromApp, isXNext:!this.props.isXNext})
        this.props.setTheState({squares:squaresFromApp, isXNext:!this.props.isXNext, history:[...this.props.history,{squares:squaresFromApp,isXNext:!this.props.isXNext}]})
      }
    render() {
        let status =''
        let winner = this.calculateWinner(this.props.squares)
        if(winner){
            status=`Player ${winner} is winning ` 
        }else{
            status = `Next player:  ${this.props.isXNext? 'X' : 'O'}`
        }
        
        return (
            <div>
                <h2>{status}</h2>
                <div className="row">
               {this.renderSquare(0)}
               {this.renderSquare(1)}
               {this.renderSquare(2)}
                </div>

                <div className="row">
                {this.renderSquare(3)}
               {this.renderSquare(4)}
               {this.renderSquare(5)}
                </div>

                <div className="row">
                {this.renderSquare(6)}
               {this.renderSquare(7)}
               {this.renderSquare(8)}
                </div>
              
             
             
            </div>
        )
    }
}