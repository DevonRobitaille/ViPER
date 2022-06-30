import { useRouter } from "next/router"
import { useState } from "react"
import { useUserContext } from "../context/user.context"
import { trpc } from "../utils/trpc"
import { Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { CreateUserInput } from '../schema/user.schema';

export function AdminPage() {
    const user = useUserContext()
    const router = useRouter()

    const [companyModalIsOpen, setCompanyModalIsOpen] = useState(false);
    const [jobModalIsOpen, setJobModalIsOpen] = useState(false);
    const [vendorModalIsOpen, setVendorModalIsOpen] = useState(false);

    // User Modal
    const [addUserModalIsOpen, setAddUserModalIsOpen] = useState(false);
    const { handleSubmit: addUserHandleSubmit, register: addUserRegister, reset: addUserReset } = useForm<CreateUserInput>()
    const { mutate, error } = trpc.useMutation(['users.register-user'], {
        onSuccess: () => {
            setAddUserModalIsOpen(false)
        },
    })
    const onUserSubmit = (values: CreateUserInput) => {
        addUserReset()
    }

    if (user?.role !== 'Admin') router.push('/')
    else {
        const { data: userData, isLoading } = trpc.useQuery(['users.all'])

        return (
            <>
                {/* Add User Modal */}
                <Dialog className="flex mx-auto absolute z-50" open={addUserModalIsOpen} onClose={() => setAddUserModalIsOpen(false)}>
                    {/* The backdrop, rendered as a fixed sibling to the panel container */}
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                    {/* Full-screen container to center the panel */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="flex flex-col bg-white px-10 py-5 items-center">
                            {/* title */}
                            <Dialog.Title className='text-2xl font-semibold mb-4'>Add User</Dialog.Title>

                            {/* body */}
                            < p className='text-red-500 text-center font-semibold text-lg' > {error && error.message} </p>
                            <form onSubmit={addUserHandleSubmit(onUserSubmit)} className='mx-auto flex flex-col content-center justify-center items-center gap-2' >

                                {/* Fields */}
                                <div className='inputDiv'>
                                    <input {...addUserRegister('firstName')} className='inputField' type='text' placeholder='First Name' />
                                </div>
                                <div className='inputDiv'>
                                    <input {...addUserRegister('lastName')} className='inputField' type='text' placeholder='Last Name' />
                                </div>
                                <div className='inputDiv'>
                                    <input {...addUserRegister('email')} className='inputField' type='email' placeholder='Email' />
                                </div>

                                {/* buttons for submitting */}
                                <div className='flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b'>
                                    <button onClick={() => setAddUserModalIsOpen(false)} className='text-red-500 hover:text-[#f7498e] mt-1 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>Cancel</button>
                                    <button type="submit" onClick={() => setAddUserModalIsOpen(false)} className='btn uppercase font-bold'>Create</button>
                                </div>
                            </form>


                        </Dialog.Panel>
                    </div>
                </Dialog>
                <div className='grid mt-10 grid-cols-1 gap-8 mx-20 md:grid-cols-2'>
                    {/* Users Section */}
                    <section className='flex-col'>
                        <button className='btn w-40 mb-4' onClick={() => setAddUserModalIsOpen(true)}>Add User</button>
                        <div className='border-2 b-[#A0A0A0] overflow-auto'>
                            {isLoading && <div>Loading...</div>}
                            {!isLoading && userData &&
                                userData.map((user, index) => {
                                    return (
                                        <div key={`user-${index}`} className='flex flex-col'>
                                            <div className='flex flex-row ml-2 mt-2 mr-2 items-center'>
                                                <div className='flex-1'>
                                                    <p className='text-sm'>{user.firstName + " " + user.lastName}</p>
                                                    <p className='text-xs'>{user.email}</p>
                                                </div>
                                                <button onClick={() => { }} className='btn flex items-center h-5 justify-center w-10 text-xs mr-2'>Edit</button>
                                                <button onClick={() => { }} className='btn flex items-center h-5 justify-center w-20 text-xs'>Disable</button>
                                            </div>
                                            <hr className='h-0.5 bg-[#DDD] m-2' />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </section>

                    {/* Company Section */}
                    <section className='flex-col'>
                        <button className='btn w-40 mb-4'>Add Company</button>
                        <div className='border-2 b-[#A0A0A0] overflow-auto'>
                            {/*companyList.map((company, index) => {
                            return (
                                <div key={`company-${index}`} className='flex flex-col'>
                                    <div className='flex flex-row ml-2 mt-2 mr-2 items-center'>
                                        <div className='flex-1'>
                                            <p className='text-sm'>Company</p>
                                        </div>
                                        <button className='btn flex items-center h-5 justify-center w-10 text-xs mr-2'> Edit</button>
                                        <button className='btn flex items-center h-5 justify-center w-20 text-xs'>Disable</button>
                                    </div>
                                    <hr className='h-0.5 bg-[#DDD] m-2' />
                                </div>
                            )
                        })*/}
                        </div>
                    </section>

                    {/* Job Title Section */}
                    <section className='flex-col'>
                        <button className='btn w-40 mb-4'>Add Job Title</button>
                        <div className='border-2 b-[#A0A0A0] overflow-auto'>
                            {/*jobTitleList.map((jobTitle, index) => {
                            return (
                                <div key={`jobTitle-${index}`} className='flex flex-col'>
                                    <div className='flex flex-row ml-2 mt-2 mr-2 items-center'>
                                        <div className='flex-1'>
                                            <p className='text-sm'>Job title</p>
                                        </div>
                                        <button className='btn flex items-center h-5 justify-center w-10 text-xs mr-2'> Edit</button>
                                        <button className='btn flex items-center h-5 justify-center w-20 text-xs'>Disable</button>
                                    </div>
                                    <hr className='h-0.5 bg-[#DDD] m-2' />
                                </div>
                            )
                        })*/}
                        </div>
                    </section>

                    {/* Vendor Section */}
                    <section className='flex-col'>
                        <button className='btn w-40 mb-4'>Add Vendor</button>
                        <div className='border-2 b-[#A0A0A0] overflow-auto'>
                            {/*jobTitleList.map((jobTitle, index) => {
                            return (
                                <div key={`jobTitle-${index}`} className='flex flex-col'>
                                    <div className='flex flex-row ml-2 mt-2 mr-2 items-center'>
                                        <div className='flex-1'>
                                            <p className='text-sm'>Job title</p>
                                        </div>
                                        <button className='btn flex items-center h-5 justify-center w-10 text-xs mr-2'> Edit</button>
                                        <button className='btn flex items-center h-5 justify-center w-20 text-xs'>Disable</button>
                                    </div>
                                    <hr className='h-0.5 bg-[#DDD] m-2' />
                                </div>
                            )
                        })*/}
                        </div>
                    </section>

                    {/* Reports Section */}
                    <section className='flex-col mb-4 md:mb-0'>
                        <button className='btn text-lg flex items-start ml-0 pl-0 font-semibold bg-white text-[#A0A0A0] mt-[2px] border-none mb-3 hover:bg-white hover:cursor-default'>Manage Reports</button>
                        <div className='border-2 b-[#A0A0A0] overflow-auto'>
                            {/*reportList.map((report, index) => {
                            return (
                                <div key={`reports-${index}`} className='flex flex-col'>
                                    <div className='flex flex-row ml-2 mt-2 mr-2 items-center'>
                                        <div className='flex-1'>
                                            <p className='text-sm'>test</p>
                                        </div>
                                        <button className='btn flex items-center h-5 justify-center w-20 text-xs'>Disable</button>
                                    </div>
                                    <hr className='h-0.5 bg-[#DDD] m-2' />
                                </div>
                            )
                        })*/}
                        </div>
                    </section>

                    {/* Filler */}
                    <div className="col-span-1 h-0 p-0 m-0" />

                    {/* Logo */}
                    <section className='flex-col col-span-1'>
                        <h2 className='font-semibold text-lg mb-4'>Change Logo</h2>
                        <div className='border-2 b-[#A0A0A0] px-2 py-1 mb-4'>
                            <button className='btn border b-[#AAAAAA] text-black bg-[#DDD] w-40 text-xs hover:bg-[#E9E9E9]'>Browse Folder</button>
                            <span className='ml-4 text-sm text-[#A0A0A0]'>logo.png</span>
                        </div>
                        <button className='btn'>Upload Logo</button>
                    </section>
                </div>
            </>
        )
    }

}

export default AdminPage