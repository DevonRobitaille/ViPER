import { useRouter } from 'next/router'
import { trpc } from '../utils/trpc'

function ActivatePage() {
    const router = useRouter()
    const hash = router.asPath.split('#token=')[1]
    const { data, isLoading } = trpc.useQuery([
        'users.verify-email',
        {
            hash
        }
    ])

    if (isLoading) return (
        <p>Verifying...</p>
    )

    router.push('/')

    return <p>Redirecting...</p>
}

export default ActivatePage