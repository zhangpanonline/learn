import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../store/counterSlice'

export default function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <button onClick={() => { dispatch(increment()) }} >+</button>
            { count }
            <button onClick={() => { dispatch(decrement()) }} >-</button>
        </div>
    )
}