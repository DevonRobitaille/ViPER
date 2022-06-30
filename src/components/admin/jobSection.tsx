import { useState } from "react"
import { trpc } from "../../utils/trpc"
import dynamic from "next/dynamic"
import { CreateJobInput } from '../../schema/job.schema';

const EditJobModal = dynamic(() => import('../modal/editJobModal'), {
    ssr: false
})

const AddJobModal = dynamic(() => import('../modal/addJobModal'), {
    ssr: false
})

function JobSection() {
    const { data, isLoading } = trpc.useQuery(['job.all'])

    // User Section
    const [addJobModalIsOpen, setAddJobModalIsOpen] = useState(false);
    const [editJobModalIsOpen, setEditJobModalIsOpen] = useState(false);
    const [editJobDetails, setEditJobDetails] = useState<CreateJobInput>({
        name: "",
    });

    return (
        <>
            <AddJobModal
                isOpen={addJobModalIsOpen}
                setIsOpen={setAddJobModalIsOpen}
            />
            <EditJobModal
                namePlaceholder={editJobDetails.name}
                isOpen={editJobModalIsOpen}
                setIsOpen={setEditJobModalIsOpen}
            />

            <section className='flex-col'>
                <button className='btn w-40 mb-4' onClick={() => setAddJobModalIsOpen(true)}>Add Job Title</button>
                <div className='border-2 b-[#A0A0A0] overflow-auto'>
                    {isLoading && <div>Loading...</div>}
                    {!isLoading && data &&
                        data.map((job, index) => {
                            return (
                                <div key={`job-${index}`} className='flex flex-col'>
                                    <div className='flex flex-row ml-2 mt-2 mr-2 items-center'>
                                        <div className='flex-1'>
                                            <p className='text-sm'>{job.name}</p>
                                        </div>
                                        <button onClick={() => {
                                            setEditJobDetails((prev) => prev = { ...prev, name: job.name })
                                            setEditJobModalIsOpen(true)
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

export default JobSection