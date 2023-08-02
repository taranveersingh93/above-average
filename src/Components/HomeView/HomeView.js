import './HomeView.css';
import IntroText from './IntroText/IntroText';
import SpButton from './SpButton/SpButton';
import { Link } from 'react-router-dom';
import { fetchSp500 } from '../../apiCalls';
import { useEffect, useState } from 'react';
import { extractData } from '../../helperFunctions';

const HomeView = () => {
  const [spData, setSpData] = useState({});

  useEffect(() => {
    fetchSp500().then(data => {
      extractData(data, setSpData)
    })
  }, [])

  

  return (
    <div className='home-view'>
      <IntroText />
      <Link to='/sp500'>
        {/* <SpButton currentPrice={currentPrice} average={average}/> */}
      </Link>
    </div>
  )
}

export default HomeView;