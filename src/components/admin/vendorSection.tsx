import { useState } from "react"
import { trpc } from "../../utils/trpc"
import dynamic from "next/dynamic"
import { UpdateVendorInput } from '../../schema/vendor.schema';

const AddVendorModal = dynamic(() => import('../modal/addVendorModal'), {
    ssr: false
})

const EditVendorModal = dynamic(() => import('../modal/editVendorModal'), {
    ssr: false
})

function VendorSection() {
    const { data, isLoading } = trpc.useQuery(['vendor.all'])

    // User Section
    const [addVendorModalIsOpen, setAddVendorModalIsOpen] = useState(false);
    const [editVendorModalIsOpen, setEditVendorModalIsOpen] = useState(false);
    const [editVendorDetails, setEditVendorDetails] = useState<UpdateVendorInput>({
        firstName: "",
        lastName: "",
        email: undefined,
        companyId: "",
        jobId: "",
        id: ""
    });

    return (
        <>
            {addVendorModalIsOpen &&
                <AddVendorModal
                    isOpen={addVendorModalIsOpen}
                    setIsOpen={setAddVendorModalIsOpen}
                />
            }
            {editVendorModalIsOpen &&
                <EditVendorModal
                    firstNamePlaceholder={editVendorDetails.firstName}
                    lastNamePlaceholder={editVendorDetails.lastName}
                    emailPlaceholder={editVendorDetails.email}
                    companyId={editVendorDetails.companyId}
                    jobId={editVendorDetails.jobId}
                    id={editVendorDetails.id}
                    isOpen={editVendorModalIsOpen}
                    setIsOpen={setEditVendorModalIsOpen}
                />
            }
            <section className='flex-col'>
                <button className='btn w-40 mb-4' onClick={() => setAddVendorModalIsOpen(true)}>Add Vendor</button>
                <div className='border-2 b-[#A0A0A0] overflow-auto'>
                    {isLoading && <div>Loading...</div>}
                    {!isLoading && data &&
                        data.map((vendor, index) => {
                            return (
                                <div key={`vendor-${index}`} className='flex flex-col'>
                                    <div className='flex flex-row ml-2 mt-2 mr-2 items-center'>
                                        <div className='flex-1'>
                                            <p className='text-sm'>{vendor.firstName + " " + vendor.lastName}</p>
                                            <p className='text-xs'>{vendor.company.name + " - " + vendor.job.name}<span>{(vendor.email) ? " - " + vendor.email : " - " + "Contact Not Found"}</span></p>
                                        </div>
                                        <button onClick={() => {
                                            setEditVendorDetails((prev) => prev = { ...prev, id: vendor.id, firstName: vendor.firstName, lastName: vendor.lastName, email: vendor.email, companyId: vendor.company.id, jobId: vendor.job.id })
                                            setEditVendorModalIsOpen(true)
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

export default VendorSection