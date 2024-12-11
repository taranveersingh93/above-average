import logoImage from '../../../images/up-arrow.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo d-flex justify-content-evenly align-items-center">
      <img src={logoImage} className='logo-img' alt='up arrow'></img>
      <h1 className='logo-text'>Above Average</h1>
    </div>
  )
}

export default Logo;