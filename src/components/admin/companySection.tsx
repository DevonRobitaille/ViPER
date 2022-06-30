import { useState } from "react"
import { trpc } from "../../utils/trpc"
import dynamic from "next/dynamic"
import { CreateCompanyInput } from '../../schema/company.schema';

const AddCompanyModal = dynamic(() => import('../modal/addCompanyModal'), {
    ssr: false
})

const EditCompanyModal = dynamic(() => import('../modal/editCompanyModal'), {
    ssr: false
})

function CompanySection() {
    const { data, isLoading } = trpc.useQuery(['company.all'])

    // User Section
    const [addCompanyModalIsOpen, setAddCompanyModalIsOpen] = useState(false);
    const [editCompanyModalIsOpen, setEditCompanyModalIsOpen] = useState(false);
    const [editCompanyDetails, setEditCompanyDetails] = useState<CreateCompanyInput>({
        name: "",
        contact: undefined,
    });

    return (
        <>
            <AddCompanyModal
                isOpen={addCompanyModalIsOpen}
                setIsOpen={setAddCompanyModalIsOpen}
            />
            <EditCompanyModal
                namePlaceholder={editCompanyDetails.name}
                contactPlaceholder={editCompanyDetails.contact}
                isOpen={editCompanyModalIsOpen}
                setIsOpen={setEditCompanyModalIsOpen}
            />

            <section className='flex-col'>
                <button className='btn w-40 mb-4' onClick={() => setAddCompanyModalIsOpen(true)}>Add Company</button>
                <div className='border-2 b-[#A0A0A0] overflow-auto'>
                    {isLoading && <div>Loading...</div>}
                    {!isLoading && data &&
                        data.map((company, index) => {
                            return (
                                <div key={`company-${index}`} className='flex flex-col'>
                                    <div className='flex flex-row ml-2 mt-2 mr-2 items-center'>
                                        <div className='flex-1'>
                                            <p className='text-sm'>{company.name}</p>
                                            <p className='text-xs'>{company.contact ? company.contact : "Contact Not Found"}</p>
                                        </div>
                                        <button onClick={() => {
                                            setEditCompanyDetails((prev) => prev = { ...prev, name: company.name, contact: company.contact })
                                            setEditCompanyModalIsOpen(true)
                                        }} className='btn flex items-center h-5 justify-center w-10 text-xs mr-2'>Edit</button>
                                    </div>
                                    <hr className='h-0.5 bg-[#DDD] m-2' />
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

export default CompanySection