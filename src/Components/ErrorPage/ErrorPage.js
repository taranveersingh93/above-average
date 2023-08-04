import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className='error-page'>
      <h2>Sorry, path not found. Did you mean to visit our <Link to='/'>Homepage?</Link></h2>
    </div>
  )
}

export default ErrorPage