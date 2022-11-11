import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { FetchedUser } from "../types/sanityInterfaces";
import { Navbar, Feed, PinDetail, CreatePin, Search } from '../components'

const Pins = (props: { user: FetchedUser }) =>
{
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='px-2 md:px-5'>
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={props.user} />
      </div>
      <div className="h-full">
        <Routes>
          <Route path='/' element={<Feed />}></Route>
          <Route path='/category/:categoryId' element={<Feed />}></Route>
          <Route path='/pin-detail/:pinId' element={<PinDetail user={props.user} />}></Route>
          <Route path='/create-pin' element={<CreatePin user={props.user} />}></Route>
          <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default Pins