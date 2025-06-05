import { useState } from 'react'

export default function Counter() {
  const [ count, setCount ] = useState(0)

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => {
        setCount(count => count + 1)
        setCount(count => count + 1)
        setCount(count => count + 1)
      }}>Click Me</button>
    </>
  )
}