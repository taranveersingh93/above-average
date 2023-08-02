import { useEffect, useState } from 'react';
import './SpButton.css';

const SpButton = ({currentPrice, previousPrice, average}) => {
  const [aboveAverage, setAboveAverage] = useState('below');
  const percentChange = ((currentPrice - previousPrice)*100)/currentPrice;
  
  useEffect(() => {
    if (currentPrice && average) {
      if (currentPrice > average) {
        setAboveAverage('above');
      } else {
        setAboveAverage('below');
      }
    }
  }, [currentPrice, average])

  return (
    <div className='index-container sp500'>
      <h2 className='index-title'>S&P 500</h2>
      <p>Last close: {currentPrice}</p>
      <p>Change: {percentChange}%</p>
      <p>S&P 500 is {aboveAverage} its moving average</p>
      <p>
        Click to view S&P 500 constituents
      </p>
    </div>
  )
}

export default SpButton;