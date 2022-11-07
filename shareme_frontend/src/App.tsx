import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './containers/Home'

const App = (): JSX.Element =>
{
    return (
        <Routes>
            <Route path='login' element={<Login />}></Route>
            <Route path='/*' element={<Home />}></Route>
        </Routes>
    )
}

export default App