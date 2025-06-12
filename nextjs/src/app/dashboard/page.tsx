"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashBoard() {
    const router = useRouter()
    function jumpTo(id) {
        router.push(`/list/${id}`)
    }
    return (
        <div>
            <h1>dashboard</h1>
            <ul>
                <li>
                    <Link href="/list/1" >item 1</Link>
                </li>
                <li>
                    <Link href="/list/1" >item 2</Link>
                </li>
                <li onClick={() => jumpTo(3)} >item 3</li>
            </ul>
        </div>
    )
}