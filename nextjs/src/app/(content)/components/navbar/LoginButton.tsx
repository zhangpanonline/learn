'use client'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

import { useRouter } from 'next/navigation'

export default function LoginButton() {

    const { data } = useSWR('https://jsonplaceholder.typicode.com/users/1', fetcher)

    const router = useRouter()
    const handleLogin = () => router.push('/login')
    return <button className="btn btn-ghost" onClick={handleLogin} >
        { data?.name ?? '登录/注册'}
        </button>
}