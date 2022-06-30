import { useRouter } from 'next/router'
import { useUserContext } from '../context/user.context'
import { MenuIcon } from '@heroicons/react/solid'
import { UserIcon, LogoutIcon, FolderOpenIcon, CogIcon, DocumentReportIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function NavBarDropDown() {
    const router = useRouter()
    const user = useUserContext()

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div className='hover:text-black text-[#A0A0A0] flex items-center'>
                <Menu.Button className='items-center'>
                    <MenuIcon className='w-9' />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {user && user.role === 'Admin' &&
                            <Menu.Item>
                                {({ active }) => (
                                    <div className='NavButtons flex hover:text-black text-[#A0A0A0] hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg hover:font-semibold py-0 px-2 m-0'>
                                        <CogIcon className='h-9' />
                                        <p
                                            onClick={() => router.push('/admin')}
                                            className='flex flex-1 px-2 py-2 text-sm'
                                        >
                                            Admin
                                        </p>
                                    </div>

                                )}
                            </Menu.Item>
                        }
                        <Menu.Item>
                            {({ active }) => (
                                <div className='NavButtons flex hover:text-black text-[#A0A0A0] hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg hover:font-semibold py-0 px-2 m-0'>
                                    <DocumentReportIcon className='h-9 mb-1' />
                                    <p
                                        onClick={() => router.push('/new')}
                                        className='flex flex-1 px-2 py-2 text-sm'
                                    >
                                        New Report
                                    </p>
                                </div>

                            )}
                        </Menu.Item>
                        <hr />
                        <Menu.Item>
                            {({ active }) => (
                                <div className='NavButtons flex hover:text-black text-[#A0A0A0] hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg hover:font-semibold py-0 px-2 m-0'>
                                    <FolderOpenIcon className='h-9 mt-1' />
                                    <p
                                        onClick={() => router.push('/folder')}
                                        className='flex flex-1 px-2 py-2 text-sm'
                                    >
                                        Folder
                                    </p>
                                </div>

                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div className='NavButtons flex hover:text-black hover:cursor-pointer text-[#A0A0A0] hover:bg-gray-200 hover:border hover:rounded-lg hover:font-semibold py-0 px-2 m-0'>
                                    <UserIcon className='h-9' />
                                    <p
                                        onClick={() => router.push('/profile')}
                                        className='flex flex-1 px-2 py-2 text-sm'
                                    >
                                        Account
                                    </p>
                                </div>

                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div className='NavButtons flex hover:text-black hover:cursor-pointer text-[#A0A0A0] hover:bg-gray-200 hover:border hover:rounded-lg hover:font-semibold py-0 px-2 m-0'>
                                    <LogoutIcon className='h-9 w-7' />
                                    <p
                                        onClick={() => router.push('/logout')}
                                        className='flex flex-1 px-2 py-2 text-sm'
                                    >
                                        Sign Out
                                    </p>
                                </div>

                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default NavBarDropDown