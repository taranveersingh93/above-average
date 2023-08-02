import './HomeView.css';
import IntroText from './IntroText/IntroText';
import SpButton from './SpButton/SpButton';
import { Link } from 'react-router-dom';
import { fetchSp500 } from '../../apiCalls';
import { useEffect, useState } from 'react';

const HomeView = () => {
  const [spData, setSpData] = useState({});

  const extractData = (data) => {
    const baseData = data.historical.slice(0,150);
    const allClosingPrices = baseData.map(day => day.close);
    const priceSum = allClosingPrices.reduce((sum, price) => sum + price, 0);
    const average = (priceSum/150).toFixed(2);

  }

  useEffect(() => {
    fetchSp500().then(data => {
      extractData(data)
    })
  }, [])
  return (
    <div className='home-view'>
      <IntroText />
      <Link to='/sp500'>
        {/* <SpButton currentPrice={currentPrice} previousPrice={previousPrice} average={average}/> */}
      </Link>
    </div>
  )
}

export default HomeView;