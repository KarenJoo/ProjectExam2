import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
return (
    <nav className="navbar">
      <Link to='/'>
        <h1>Holidaze</h1>
      </Link>
      <div className='navLinks'>
      <Link to='/specific'>
      </Link>
      </div>
    </nav>
)
}

export default Navbar
