// import useSWR from "swr";

// const fetcher = (k: string) => fetch(k).then(r => r.json())

export default async function Post({ params }: { params: { id: string } }) {
    const { id } = await params
    // const { data, isLoading } = useSWR(`https://jsonplaceholder.typicode.com/posts?id=${id}`, fetcher)
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${id}`).then(r => r.json())
    return (
            <div className="prose min-h-200 w-50 mx-auto pt-10">
                {data[0].body}
            </div>
    )
}