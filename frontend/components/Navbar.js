import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUserId } from '../lib/auth'
import Logo from '../images/Logo.jpg'

const Navbar = (props) => {
  const userId = getUserId()
  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/')
  }

  return <header>
    <nav className="desktopNav">
      <Link to="/cities">
      <button className="darkButton">Home</button>
    </Link>

    {localStorage.getItem('token')
      && <Link to="/cities/add-city">
        <button className="darkButton">Add City</button>
      </Link>}

    <img className="navLogo" src={Logo} alt="Logo" />

    {localStorage.getItem('token')
      && <Link to={`/user/${userId}/update`}>
        <button>Edit Profile</button>
      </Link>}

    {localStorage.getItem('token')
      && <button onClick={handleLogout}>Logout</button>}
  </nav>

  <nav className="mobileNav">
<div className="mobileLogo">
  <img src={Logo} alt="Logo" />
</div>
<div className="mobileButtons">
  <Link to="/cities">
    <button className="darkButton">Home</button>
  </Link>

  {localStorage.getItem('token')
    && <Link to="/cities/add-city">
      <button className="darkButton">Add City</button>
    </Link>}

  {localStorage.getItem('token')
    && <Link to={`/user/${userId}/update`}>
      <button>Edit Profile</button>
    </Link>}

  {localStorage.getItem('token')
    && <button onClick={handleLogout}>Logout</button>}
</div>
</nav>
  </header>
  
}

export default withRouter(Navbar)