import { useRouter } from 'next/router'
import React from 'react'
import PERViewOnlyFORM from '../components/perReadOnlyForm'

function Report() {
    const router = useRouter()
    const { id } = router.query
    if (!id || typeof id !== "string" || Array.isArray(id)) router.push('/reports')

    return (
        <section className='flex'>
            {/* Report */}
            <PERViewOnlyFORM id={id
                ? typeof id === "string"
                    ? !Array.isArray(id)
                        ? id
                        : ""
                    : ""
                : ""} />

        </section >
    )
}

export default Report