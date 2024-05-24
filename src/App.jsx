import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Layout from './components/Layout/index'
import VenueDetails from './pages/VenueDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CreateVenue from './pages/manager/CreateVenue'
import UpdateVenue from './pages/manager/UpdateVenue'


function App() {
  return (
    <div className='App'>
      <Layout>
        <Routes>
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
