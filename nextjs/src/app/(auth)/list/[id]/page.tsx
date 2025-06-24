
type Params = {
    params: {
        id: string
    }
}
export default function ListPage({ params }: Params) {
    return (
        <div>
            <h3>list item：{ params.id }</h3>
        </div>
    )
}