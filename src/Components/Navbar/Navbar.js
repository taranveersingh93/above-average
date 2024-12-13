import './Navbar.css'
import Logo from './Logo/Logo';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className={`navbar d-flex flex-column flex-md-row justify-content-between align-items-center py-3 px-5`}>
      <Logo />
      <div className='navlinks d-flex justify-content-between align-items-center fs-5 my-3'>
        <NavLink className='mx-4' to='/'><p className='mb-2'>Home</p></NavLink>
        <NavLink className='mx-4' to='/watchlist'><p className='mb-2'>Watchlist</p></NavLink>
      </div>
    </div>
  )
}

export default Navbar;