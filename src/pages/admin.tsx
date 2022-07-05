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

const VendorSection = dynamic(() => import('../components/admin/vendorSection'), {
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
                <VendorSection />

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