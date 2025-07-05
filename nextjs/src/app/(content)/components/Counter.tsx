
'use client'

import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '@/store/counterSlice'

import { RootState, AppDispatch } from '@/store'

// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// const useAppDispatch: () => AppDispatch = useDispatch

const useAppSelector = useSelector.withTypes<RootState>()
const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default function () {
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()

    return (
        <div>
            <button className="btn" onClick={() => dispatch(decrement())} >-</button>
            <span>count：{count}</span>
            <button className="btn" onClick={() => dispatch(increment())} >+</button>
        </div>
    )
}