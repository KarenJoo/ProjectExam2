import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import VenueDetails from './pages/VenueDetails'
import Layout from './components/Layout'
import { ThemeProvider } from '@emotion/react'
import theme from './themes/muiTheme'


function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
      <Layout>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/venue/:id' element={<VenueDetails />} />
      </Routes>
      </Layout>
      </ThemeProvider>
    </div>
  )
}

export default App
