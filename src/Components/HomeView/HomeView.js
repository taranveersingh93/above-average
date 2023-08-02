import './HomeView.css';
import IntroText from './IntroText/IntroText';
import SpButton from './SpButton/SpButton';
import { Link } from 'react-router-dom';

const HomeView = () => {
  
  return (
    <div className='home-view'>
      <IntroText />
      <Link to='/sp500'>
        <SpButton currentPrice={currentPrice} previousPrice={previousPrice} average={average}/>
      </Link>
    </div>
  )
}

export default HomeView;