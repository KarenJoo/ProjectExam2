import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import VenueDetails from './pages/VenueDetails'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/venue/:id' element={<VenueDetails />} />
      </Routes>
    </div>
  )
}

export default App
