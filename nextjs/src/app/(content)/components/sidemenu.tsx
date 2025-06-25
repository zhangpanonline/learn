import Link from "next/link";
import useSWR from "swr";

const fetcher = (k: string) => fetch(k).then(r => r.json())

interface Menu {
    id: number,
    title: string,
}

export default function SideMenu() {

    // "userId": 3,
    // "id": 29,
    // "title": "iusto eius quod necessitatibus culpa ea",
    // "body": "odit magnam ut saepe sed non qui\ntempora atque nihil\naccusamus illum doloribus illo dolor\neligendi repudiandae odit magni similique sed cum maiores"
    const { data: menu, isLoading } = useSWR('https://jsonplaceholder.typicode.com/todos', fetcher)

    {
        if (isLoading) {
            return <span className="loading loading-dots loading-xl"></span>
        } else {
            return (
                <ul className="menu bg-base-200 rounded-box">
                    {
                        menu.map((v: Menu) => (<li key={v.id}><Link title={v.title} className="text-ellipsis overflow-hidden whitespace-nowrap block max-w-100 border-b rounded-none border-base-300" href={`posts/${v.id}`}>{v.id}.{v.title}</Link></li>))
                    }
                </ul>
            )
        }
    }
}