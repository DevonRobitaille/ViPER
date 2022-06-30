import { trpc } from "../../utils/trpc"
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { UpdateVendorInput } from '../../schema/vendor.schema';
import { CompanyListBoxSchema } from "../../schema/company.schema";
import { JobListBoxSchema } from "../../schema/job.schema";
import { Dispatch, SetStateAction, useState, Fragment } from "react";
import { NextPage } from "next";

interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    id: string;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    emailPlaceholder?: string | null;
    companyId: string;
    jobId: string;
}

const EditVendorModal: NextPage<IProps> = (props) => {
    // Edit Company Modal
    const { isOpen, setIsOpen, id, firstNamePlaceholder, lastNamePlaceholder, emailPlaceholder, companyId, jobId } = props
    const { handleSubmit, register, reset } = useForm<UpdateVendorInput>()
    const { mutate, error } = trpc.useMutation(['vendor.update-vendor'], {
        onSuccess: () => {
            setIsOpen(false)
        },
    })

    const onSubmit = (values: UpdateVendorInput) => {
        reset()
        if (!selectedCompany || !selectedJob) return;
        values.firstName = values.firstName.trim().length > 0 ? values.firstName : firstNamePlaceholder
        values.lastName = values.lastName.trim().length > 0 ? values.lastName : lastNamePlaceholder
        values.companyId = selectedCompany && selectedCompany.id
        values.jobId = selectedJob && selectedJob.id
        values.id = id;
        values.email = values.email && values.email.trim().length > 0 ? values.email.trim() : emailPlaceholder
        mutate({ ...values })
    }

    const company_id = companyId

    const [selectedCompany, setSelectedCompany] = useState<CompanyListBoxSchema | null>(null)
    const { data: companyData } = trpc.useQuery(['company.all'], {
        onSuccess: (result) => {
            const index = result.findIndex(company => company.id === companyId)
            let company = result[index]
            setSelectedCompany((prev) => prev = company)
        }
    })
    const [selectedJob, setSelectedJob] = useState<JobListBoxSchema | null>(null)
    const { data: jobData } = trpc.useQuery(['job.all'], {
        onSuccess: (result) => {
            const index = result.findIndex(job => job.id === jobId)
            let job = result[index]
            setSelectedJob((prev) => prev = job)
        }
    })

    return (
        <Dialog className="flex mx-auto absolute z-50" open={isOpen} onClose={() => setIsOpen(false)}>
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="flex flex-col bg-white px-10 py-5 items-center">
                    {/* title */}
                    <Dialog.Title className='text-2xl font-semibold mb-4'>Edit Vendor</Dialog.Title>

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
                            <input {...register('email')} className='inputField' type='email' placeholder={emailPlaceholder !== null ? emailPlaceholder : 'Email (optional)'} />
                        </div>
                        <Listbox {...register('companyId')} value={selectedCompany} onChange={setSelectedCompany}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-[220px] cursor-default bg-white py-2 pl-3 pr-10 text-left border border-[#A0A0A0] rounded-none focus:outline-none sm:text-sm">
                                    <span className="block truncate">{selectedCompany && selectedCompany.name}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <SelectorIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options>
                                        {companyData &&
                                            companyData.map((company, index) => (
                                                <Listbox.Option
                                                    key={company.id}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#EDEDED] text-amber-900' : 'text-gray-900'
                                                        }`
                                                    }
                                                    value={company}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span
                                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                    }`}
                                                            >
                                                                {company.name}
                                                            </span>
                                                            {selected ? (
                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#FF0066]">
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))
                                        }
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>

                        <Listbox {...register('jobId')} value={selectedJob} onChange={setSelectedJob}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-[220px] cursor-default bg-white py-2 pl-3 pr-10 text-left border border-[#A0A0A0] rounded-none focus:outline-none sm:text-sm">
                                    <span className="block truncate">{selectedJob && selectedJob.name}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <SelectorIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options>
                                        {jobData &&
                                            jobData.map((job, index) => (
                                                <Listbox.Option
                                                    key={job.id}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#EDEDED] text-amber-900' : 'text-gray-900'
                                                        }`
                                                    }
                                                    value={job}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span
                                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                    }`}
                                                            >
                                                                {job.name}
                                                            </span>
                                                            {selected ? (
                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#FF0066]">
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))
                                        }
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>

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

export default EditVendorModal