
export default async function Fn({ params }) {
    const { id } = await params
    return (
        <div>
            <p>List Item：{id}</p>
        </div>
    )
}