import React, { useState, useRef, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi'
import { Link } from 'react-router-dom'

import { Sidebar } from '../components'
import { userQuery  } from '../utils/data'
import { client } from '../client';
import logo from '../assets/logo.png'
import { DecodedCredentials } from "../types/googleAuthInterfaces"
import { FetchedUser } from "../types/sanityInterfaces"
import { fetchUser } from "../utils/fetchUser";


const Home = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [user, setUser] = useState<FetchedUser>({
        userName: '',
        image: '',
        _createdAt: '',
        _id: '',
        _rev: '',
        _type: '',
        _updatedAt: ''
    })

    useEffect(() =>
    {
        const userInfo: DecodedCredentials = fetchUser();
        const query = userQuery(userInfo?.sub);

        client.fetch(query)
            .then((data: FetchedUser[]) =>
            {
                setUser(data[0])
            })
    }, [])
    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height  duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar  />
            </div>
            <div className="flex md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-28" />
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                    <img src={user?.image} alt="logo" className="w-28" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home