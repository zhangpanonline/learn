import { useState } from 'react'

type SquareType = null | 'X' | 'O'
type SquaresType = Array<SquareType>

function Square({ value, handleSquareClick }: { value: SquareType, handleSquareClick: () => void }) {

  return (
    <button className="square cursor-pointer" onClick={handleSquareClick} >
      {value}
    </button>
  )
}

export function Board({ xIsNext, squares, onPlay }: { xIsNext: boolean, squares: SquaresType, onPlay: (a: SquaresType) => void }) {
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const newSquares = squares.slice()
    if (xIsNext) {
      newSquares[i] = 'X'
    } else {
      newSquares[i] = 'O'
    }
    onPlay(newSquares)
  }

  const winner = calculateWinner(squares)
  let status;
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <>
      <div className="status" >{status}</div>
      <div className="board-row">
        <Square value={squares[0]} handleSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} handleSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} handleSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} handleSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} handleSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} handleSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} handleSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [ history, setHistory ] = useState([Array(9).fill(null)])
  const [ curMove, setCurMove ] = useState(0)
  const xIsNext = curMove % 2 === 0
  const curSquares = history[curMove]
  function handlePlay(nextSquares: SquaresType) {
    const nextHistory = [...history.slice(0, curMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurMove(nextHistory.length - 1)
  }

  const moves = history.map((squares, move) => {
    let des;
    if (move > 0) {
      des = `Go to move #${move}`
    } else {
      des = `Go to game start`
    }
    return (
      <li key={move} >
        <button onClick={() => jumpTo(move)}>{move + 1}. {des}</button>
      </li>
    )
  })

  function jumpTo(move: number) {
    setCurMove(move)
  }

  return (
    <div className='game'>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={curSquares} onPlay={handlePlay}  />
      </div>
      <div className="game-info">
        <ol>{ moves }</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares: Array<null | 'X' | 'O'>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
