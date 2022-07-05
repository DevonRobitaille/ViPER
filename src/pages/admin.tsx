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
            </div>
        )
    }

}

export default AdminPage