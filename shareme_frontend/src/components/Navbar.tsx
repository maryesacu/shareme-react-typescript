import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import { FetchedUser } from '../types/sanityInterfaces';

const Navbar = (props: { user: FetchedUser, searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<string>>, }) =>
{
    const navigate = useNavigate();

    return (
        <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
                <IoMdSearch fontSize={21} className='ml-1' />
                <input
                    type='text'
                    onChange={(e) => props.setSearchTerm(e.target.value)}
                    value={props.searchTerm}
                    onFocus={() => navigate('/search')}
                    className="p-2 w-full bg-white outline-none"
                />
            </div>
            <div className="flex gap-3">
                <Link to={`user-profile/${props.user?._id}`} className="hidden md:block">
                    <img src={props.user.image} alt="user" className='w-14 h-12 rounded-lg' />
                </Link>
                <Link to='create-pin' className='bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
                    <IoMdAdd />
                </Link>
            </div>
        </div>
    )
}

export default Navbar;