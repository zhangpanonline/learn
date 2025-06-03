import { useState } from 'react'

function Square({ value, handleSquareClick }: { value: null | 'X' | 'O', handleSquareClick: () => void }) {

  return (
    <button className="square cursor-pointer" onClick={handleSquareClick} >
      {value}
    </button>
  )
}

export default function Board() {
  const [ squares, setSquares ] = useState<Array<null | 'X' | 'O'>>(Array(9).fill(null))

  function handleClick(i: number) {
    const newSquares = squares.slice()
    newSquares[i] = 'X'
    setSquares(newSquares)
  }

  return (
    <>
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
