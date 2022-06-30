import { trpc } from "../utils/trpc"

function me() {
    const { data, error, isLoading } = trpc.useQuery(['users.all'])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{JSON.stringify(error)}</p>
    }

    return (
        <p>{JSON.stringify(data)}</p>
    )
}

export default me