import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CreateUserInput } from '../schema/user.schema'
import { trpc } from '../utils/trpc'

function SetupForm() {
    const { handleSubmit, register } = useForm<CreateUserInput>()
    const router = useRouter()

    const { mutate, error } = trpc.useMutation(['users.register-admin'], {
        onSuccess: () => {
            router.push('/')
        },
    })

    function onSubmit(values: CreateUserInput) {
        mutate({ ...values })
    }

    return (
        <div className='flex flex-col h-screen w-screen'>
            <h2 className='mx-auto m-20 text-3xl font-semibold'>ViPER</h2>
            <div className='flex flex-col md:flex-row justify-evenly'>
                <div className='max-w-sm'>
                    <p className='text-2xl mb-6'>Welcome,</p>
                    <p className='text-lg mb-6'>ViPER is a simple vendor performance evaluation report for teams.</p>
                    <p className='text-sm mb-6'>People use to generate reports for tracking the performance of vendors.</p>
                </div>
                <div className='max-w-sm'>
                    <p className='text-red-500 text-center font-semibold text-lg'>{error && error.message}</p>
                    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto flex flex-col content-center justify-center items-center gap-2'>
                        <div className='inputDiv'>
                            <input type='text' placeholder='First Name' className='inputField' {...register('firstName')} />
                            <span className='w-7' />
                        </div>
                        <div className='inputDiv'>
                            <input type='text' placeholder='Last Name' className='inputField' {...register('lastName')} />
                            <span className='w-7' />
                        </div>
                        <div className='inputDiv'>
                            <input type='email' placeholder='Email' className='inputField' {...register('email')} />
                            <span className='w-7' />
                        </div>
                        <button className='btn'>Setup My Account</button>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default SetupForm