import { useState } from "react"
import { trpc } from "../../utils/trpc"
import dynamic from "next/dynamic"

const AddUserModal = dynamic(() => import('../modal/addUserModal'), {
    ssr: false
})

const EditUserModal = dynamic(() => import('../modal/editUserModal'), {
    ssr: false
})

function UserSection() {
    const { data, isLoading } = trpc.useQuery(['users.all'])

    // User Section
    const [addUserModalIsOpen, setAddUserModalIsOpen] = useState(false);
    const [editUserModalIsOpen, setEditUserModalIsOpen] = useState(false);
    const [editUserDetails, setEditUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });
    const { mutate: toggleUserMutate } = trpc.useMutation(['users.disable-user'])

    return (
        <>
            <AddUserModal
                isOpen={addUserModalIsOpen}
                setIsOpen={setAddUserModalIsOpen}
            />
            <EditUserModal
                firstNamePlaceholder={editUserDetails.firstName}
                lastNamePlaceholder={editUserDetails.lastName}
                emailPlaceholder={editUserDetails.email}
                isOpen={editUserModalIsOpen}
                setIsOpen={setEditUserModalIsOpen}
            />

            <section className='flex-col'>
                <button className='btn w-40 mb-4' onClick={() => setAddUserModalIsOpen(true)}>Add User</button>
                <div className='border-2 b-[#A0A0A0] overflow-auto'>
                    {isLoading && <div>Loading...</div>}
                    {!isLoading && data &&
                        data.map((user, index) => {
                            return (
                                <div key={`user-${index}`} className='flex flex-col'>
                                    <div className='flex flex-row ml-2 mt-2 mr-2 items-center'>
                                        <div className='flex-1'>
                                            <p className='text-sm'>{user.firstName + " " + user.lastName}</p>
                                            <p className='text-xs'>{user.email}</p>
                                        </div>
                                        <button onClick={() => {
                                            setEditUserDetails((prev) => prev = { ...prev, firstName: user.firstName, lastName: user.lastName, email: user.email })
                                            setEditUserModalIsOpen(true)
                                        }} className='btn flex items-center h-5 justify-center w-10 text-xs mr-2'>Edit</button>
                                        <button onClick={() => toggleUserMutate({ email: user.email, toggle: !user.isActive })} className='btn flex items-center h-5 justify-center w-20 text-xs'>{user.isActive ? "Disable" : "Enable"}</button>
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

export default UserSection