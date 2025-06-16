"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import style from './style.module.scss'

export default function DashBoard() {
    const router = useRouter()
    function jumpTo(id) {
        router.push(`/list/${id}`)
    }
    return (
        <div>
            <h1 className={style.dashboard} >dashboard</h1>
            <button className="btn btn-primary">Button</button>
            <ul>
                <li>
                    <Link href="/list/1" className='underline' >item 1</Link>
                </li>
                <li>
                    <Link href="/list/1" >item 2</Link>
                </li>
                <li onClick={() => jumpTo(3)} >item 3</li>
            </ul>
        </div>
    )
}