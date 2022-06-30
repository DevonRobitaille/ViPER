import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useUserContext } from "../context/user.context"

const UserSection = dynamic(() => import('../components/admin/userSection'), {
    ssr: false
})

const CompanySection = dynamic(() => import('../components/admin/companySection'), {
    ssr: false
})

const JobSection = dynamic(() => import('../components/admin/jobSection'), {
    ssr: false
})

export function AdminPage() {
    const user = useUserContext()
    const router = useRouter()

    if (user?.role !== 'Admin') router.push('/')
    else {
        return (
            <div className='grid mt-10 grid-cols-1 gap-8 mx-20 md:grid-cols-2'>
                {/* Users Section */}
                <UserSection />

                {/* Company Section */}
                <CompanySection />

                {/* Job Title Section */}
                <JobSection />

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
        )
    }

}

export default AdminPage