import { trpc } from "../../utils/trpc"
import { Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { UpdateUserInput } from '../../schema/user.schema';
import { Dispatch, SetStateAction } from "react";
import { NextPage } from "next";

interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    emailPlaceholder: string;
}

const EditUserModal: NextPage<IProps> = (props) => {
    // Add User Modal
    const { isOpen, setIsOpen, firstNamePlaceholder, lastNamePlaceholder, emailPlaceholder } = props
    const { handleSubmit, register, reset } = useForm<UpdateUserInput>()
    const { mutate, error } = trpc.useMutation(['users.update-user'], {
        onSuccess: () => {
            setIsOpen(false)
        },
    })
    const onSubmit = (values: UpdateUserInput) => {
        reset()
        values.prevEmail = emailPlaceholder;
        values.firstName = values.firstName.trim().length > 0 ? values.firstName.trim() : firstNamePlaceholder
        values.lastName = values.lastName.trim().length > 0 ? values.lastName.trim() : lastNamePlaceholder
        values.newEmail = values.newEmail.trim().length > 0 ? values.newEmail.trim() : emailPlaceholder
        mutate({ ...values })
    }

    return (
        <Dialog className="flex mx-auto absolute z-50" open={isOpen} onClose={() => setIsOpen(false)}>
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="flex flex-col bg-white px-10 py-5 items-center">
                    {/* title */}
                    <Dialog.Title className='text-2xl font-semibold mb-4'>Edit User</Dialog.Title>

                    {/* body */}
                    < p className='text-red-500 text-center font-semibold text-lg' > {error && error.message} </p>
                    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto flex flex-col content-center justify-center items-center gap-2' >

                        {/* Fields */}
                        <div className='inputDiv'>
                            <input {...register('firstName')} className='inputField' type='text' placeholder={firstNamePlaceholder} />
                        </div>
                        <div className='inputDiv'>
                            <input {...register('lastName')} className='inputField' type='text' placeholder={lastNamePlaceholder} />
                        </div>
                        <div className='inputDiv'>
                            <input {...register('newEmail')} className='inputField' type='email' placeholder={emailPlaceholder} />
                        </div>

                        {/* buttons for submitting */}
                        <div className='flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b'>
                            <button onClick={() => setIsOpen(false)} className='text-red-500 hover:text-[#f7498e] mt-1 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>Cancel</button>
                            <button type="submit" className='btn uppercase font-bold'>Update</button>
                        </div>
                    </form>


                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default EditUserModal