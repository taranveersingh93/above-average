import './Navbar.css'
import Logo from './Logo/Logo';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  const handleScroll = () => {
    if (window.scrollY > 150) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`${scrolled? "navbar sticky": "navbar"}`}>
      <Logo />
      <div className='navlinks'>
        <NavLink to='/'><p>Home</p></NavLink>
        <NavLink to='/stocksView'><p>Nasdaq Constituents</p></NavLink>
        <NavLink to='/watchlist'><p>Watchlist</p></NavLink>
      </div>
    </div>
  )
}

export default Navbar;