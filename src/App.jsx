import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/index'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import VenueDetails from './pages/VenueDetails'
import CreateVenue from './pages/manager/CreateVenue'
import UpdateVenue from './pages/manager/UpdateVenue'

function App() {
  return (
    <div className='App'>
      <Layout>
        <Routes basename='/React'>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/venue/:id' element={<VenueDetails />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/create' element={<CreateVenue />} />
          <Route path='/update/:id' element={<UpdateVenue />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
