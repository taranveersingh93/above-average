import './Navbar.css'
import Logo from './Logo/Logo';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className={`navbar`}>
      <Logo />
      <div className='navlinks'>
        <NavLink to='/'><p>Home</p></NavLink>
        {/* <NavLink to='/stocksView'><p>Nasdaq Constituents</p></NavLink> */}
        <NavLink to='/watchlist'><p>Watchlist</p></NavLink>
      </div>
    </div>
  )
}

export default Navbar;