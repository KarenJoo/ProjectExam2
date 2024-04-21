import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import VenueDetails from './pages/VenueDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'


function App() {
  return (
    <div className='App'>
      <Layout>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/venue/:id' element={<VenueDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      </Layout>
    </div>
  )
}

export default App
