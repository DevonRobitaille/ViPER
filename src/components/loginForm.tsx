import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginUserInput } from '../schema/user.schema'
import { trpc } from '../utils/trpc'
import { UserIcon } from '@heroicons/react/outline'


function VerifyToken({ hash }: { hash: string }) {
    const router = useRouter()
    const { data, isLoading } = trpc.useQuery([
        'users.verify-otp',
        {
            hash
        }
    ])

    if (isLoading) {
        return <p>Verifying...</p>
    }

    router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/')

    return <p>Redirecting...</p>
}


function LoginForm() {
    const { handleSubmit, register, reset } = useForm<LoginUserInput>()
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const { mutate, error } = trpc.useMutation(['users.request-otp'], {
        onSuccess: () => {
            setSuccess(true)
        },
    })

    function onSubmit(values: LoginUserInput) {
        reset()
        mutate({ ...values, redirect: router.asPath })
    }

    const hash = router.asPath.split('#token=')[1]

    if (hash) {
        return <VerifyToken hash={hash} />
    }

    return (
        <div className='flex h-screen justify-center items-center' >
            <div className='text-center block max-w-sm bg-white' >

                <h2 className='text-3xl font-semibold' > ViPER </h2>
                < h3 className='text-xl font-semibold m-5' > Login </h3>

                < p className='text-red-500 text-center font-semibold text-lg' > {error && error.message
                } </p>

                {/* form */}
                <form onSubmit={handleSubmit(onSubmit)} className='mx-auto flex flex-col content-center justify-center items-center gap-2' >
                    <div className='inputDiv' >
                        <input required className='inputField' type="text" placeholder="Email" {...register('email')} />
                        < UserIcon className='pwd-icon' />
                    </div>

                    < button className='btn' > Sign in </button>
                </form>

            </div>
        </div>
    )
}

export default LoginForm