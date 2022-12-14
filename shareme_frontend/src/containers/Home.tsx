import React, { useState, useRef, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi'
import { Link, Route, Routes } from 'react-router-dom'
import { AiFillCloseCircle } from 'react-icons/ai';
import { Sidebar,  UserProfile  } from '../components'
import { userQuery  } from '../utils/data'
import { client } from '../client';
import logo from '../assets/logo.png'
import { DecodedCredentials } from "../types/googleAuthInterfaces"
import { FetchedUser } from "../types/sanityInterfaces"
import { fetchUser } from "../utils/fetchUser"
import Pins from './Pins'


const Home = () => 
{
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
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() =>
    {
        const userInfo: DecodedCredentials = fetchUser()
        const query = userQuery(userInfo?.sub);

        client.fetch(query)
            .then((data: FetchedUser[]) =>
            {
                setUser(data[0])
            })
    }, [])

    useEffect(() =>
    {
        scrollRef.current!.scrollTo(0, 0);
    }, [])


    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height  duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar user={user && user} />
            </div>
            <div className="flex md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
                    <Link to='/'>
                        <img src={logo} alt="logo" className="w-28" />
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image} alt="user-pic" className="w-9 h-9" />
                    </Link>
                </div>
                {toggleSidebar && (
                    <div className="absolute w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                        <div className="absolute w-full flex justify-end items-center p-2">
                            <AiFillCloseCircle fontSize={30} className="cursor-pointer"
                                onClick={() => setToggleSidebar(false)} />
                        </div>
                        <Sidebar user={user && user} closeToggle={setToggleSidebar} />
                    </div>
                )}
            </div>
            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userId" element={<UserProfile />} />
                    <Route path="/*" element={<Pins user={user} />} />
                </Routes>
            </div>
            
        </div>
    )
}

export default Home