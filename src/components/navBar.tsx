import { useRouter } from 'next/router'
import { useUserContext } from '../context/user.context'
import { CogIcon, DocumentReportIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import NavBarDropDown from './navBarDropDown'
import ProfileDropDown from './profileDropDown'

function NavBar() {
    const router = useRouter()
    const user = useUserContext()

    return (
        <div id='navbar' className='sticky top-0 z-50 flex bg-white px-4 shadow-sm w-full mb-1'>
            {/* Website Name */}
            <div className='flex flex-1 items-center'>
                <div onClick={() => router.push('/reports')} className='cursor-pointer text-[#FF0067] text-2xl px-2 mr-4 font-semibold items-center'>
                    <p>ViPER</p>
                </div>
            </div>

            {/* Search Box */}
            <div className='flex flex-row justify-end '>
                <form className='mr-2 flex items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1'>
                    <SearchIcon className='h-6 w-6 text-gray-400' />
                    <input className='flex-1 bg-transparent outline-none w-[240px] md:w-[400px] lg:w-[500px] xl:w-[750px]' type="text" placeholder="Search Reports" />
                    <button type="submit" hidden />
                </form>

                {/* Redirects */}
                {/* Icons */}
                <div className='flex items-end'>
                    {user && user.role === 'Admin' &&
                        <div onClick={() => router.push('/admin')} className='NavButtons hover:text-black text-[#A0A0A0]'>
                            <CogIcon className='h-9' />
                            <p className='hidden lg:inline'>Admin</p>
                        </div>
                    }
                    <div onClick={() => router.push('/new')} className='NavButtons hover:text-black text-[#A0A0A0]'>
                        <DocumentReportIcon className='h-9' />
                        <p className='hidden lg:inline'>New Report</p>
                    </div>
                    <div className='NavButtons hidden md:flex'>
                        <ProfileDropDown />
                    </div>
                    <div className='flex items-center md:hidden'>
                        <NavBarDropDown />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NavBar