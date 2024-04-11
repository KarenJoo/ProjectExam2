import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import VenueDetails from './pages/VenueDetails'
import Layout from './components/Layout'

function App() {
  return (
    <div className='App'>
      <Layout>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/venue/:id' element={<VenueDetails />} />
      </Routes>
      </Layout>
    </div>
  )
}

export default App
