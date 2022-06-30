import { Dialog } from '@headlessui/react'
import { NextPage } from 'next';
import { Dispatch, SetStateAction } from "react";

interface IProps {
    myVar: boolean;
    setMyVar: Dispatch<SetStateAction<boolean>>;
    title: string;
}

const AdminPageModal: NextPage<IProps> = (props) => {
    const { myVar: isOpen, setMyVar: setIsOpen, title } = props
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <Dialog.Panel>
                {/* title */}
                <Dialog.Title>{title}</Dialog.Title>

                {/* body */}

                {/* buttons for submitting */}
                <button onClick={() => setIsOpen(false)} className='text-red-500 mt-1 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>Cancel</button>
                <button onClick={() => setIsOpen(false)} className='btn'>Cancel</button>
            </Dialog.Panel>
        </Dialog>
    )
}

export default AdminPageModal