import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../src/styles.css'




const cellStyle = {display: "inline-block", 
fontSize:"40px", 
color:"Black",
border:"4px black solid", 
width:"50px", 
height:"50px",
textAlign:"center",
backgroundColor:"#F1E083",


}

const checkWinner = (board) => {
  let winner = null
  let players = ["X","O"]
  players.forEach((player => {
    board.forEach(row => {
      if(row.every((cell => cell === player))){
        winner = player
      }
    })
    let cols = [0,1,2]
    cols.forEach((col => {
      if(board.every((row => row[col] === player))){
        winner = player
      }
    }))
    
    if (player === board[0][0] && player === board[1][1] && player === board[2][2]){
      winner = player
    }
    if (player === board[0][2] && player === board[1][1] && player === board[2][0]){
      winner = player
    }
  }))
    



  return winner
}

const bestMove = (board, player) => {
  const validMoves = []
  board.forEach(((row,rowIdx) => row.forEach(((cell, colIdx) => {
    if(cell === " " ){
      validMoves.push([rowIdx,colIdx])
    }
  }
    ))))
    if (validMoves.length === 0){
      return [null, 0]
    }
    let highestScore = -Infinity
    let highestScoringMove = null
    validMoves.forEach((move => {
      
      const currentScore = score(board,move, player)
      if(currentScore > highestScore) {
        highestScore = currentScore
        highestScoringMove = move
      }

    }))
    return [highestScoringMove, highestScore]

}

const score = (board, move, player) => {
  const winner = checkWinner(board)

  if (winner === player){
    return 1
  }
  if (winner != null && winner != player){
    return -1
  }

  const opponent = player === 'X' ? "O" : "X"
  const newBoard = JSON.parse(JSON.stringify(board))
  const [row,col] = move

  newBoard[row][col] = player

  const [bestOpponentMove,opponentScore]= (bestMove(newBoard,opponent)) 
  return opponentScore * -1

}





const Game = () => {
const [player, setPlayer] = useState("X")
const [winner, setWinner] = useState(null)
const [board, setBoard] = useState([
  [" ", " "," "],
  [" ", " "," "],
  [" ", " "," "],])

  const makeMove = (row,col) => {
    return () => {
      const newBoard = JSON.parse(JSON.stringify(board))
      if (newBoard[row][col] === " " && winner === null){
        newBoard[row][col] = player
        setBoard(newBoard)
        if (player === "X"){
          setPlayer("O")
        } else{
          setPlayer("X")
        }
      } 
    }    
  }

 useEffect(()=> {
const winner = checkWinner(board)
if (winner){
  setWinner(winner)
}
if (player === "X"){
  const [row,col] = bestMove(board,player)[0]

  makeMove(row,col)()
}
 },[board])




  

  return (
    <div>
      Current Player: {player}
    <br/>
    {/**Best Move:{bestMove(board,player)[0]}**/ }
    <br/>

    {winner ? `The Winner is ${winner}!`: null}
    <div>

      <div className='row'>
        <div style={cellStyle} onClick={makeMove(0,0)}>{board[0][0]}</div>
        <div style={cellStyle} onClick={makeMove(0,1)}>{board[0][1]}</div>
        <div style={cellStyle} onClick={makeMove(0,2)}>{board[0][2]}</div>
      </div>

      <div  className='row'>
        <div style={cellStyle} onClick={makeMove(1,0)}>{board[1][0]}</div>
        <div style={cellStyle} onClick={makeMove(1,1)}>{board[1][1]}</div>
        <div style={cellStyle} onClick={makeMove(1,2)}>{board[1][2]}</div>
      </div>

      <div  className='row'>
        <div style={cellStyle} onClick={makeMove(2,0)}>{board[2][0]}</div>
        <div style={cellStyle} onClick={makeMove(2,1)}>{board[2][1]}</div>
        <div style={cellStyle} onClick={makeMove(2,2)}>{board[2][2]}</div>
      </div>
      </div>

      
    </div>

    
  )
}


  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
