import { useEffect, useState } from 'react';
import './NasdaqButton.css';

const NasdaqButton = ({lastClose, changePercent, average}) => {
  const [aboveAverage, setAboveAverage] = useState('below');
  
  useEffect(() => {
    if (lastClose > average) {
      setAboveAverage('above');
    } else {
      setAboveAverage('below');
    }
  }, [])

  return (
    <div className='index-container sp500'>

      <p className='click-index'>
        (Click to view Nasdaq constituents)
      </p>
      <h2 className='index-title'>NDX 100</h2>
      <p>Last close: {lastClose}</p>
      <p>Moving average: {average}</p>
      <p className={`${aboveAverage==="above"? "green-text": "red-text"}`}>NDX 100 is {aboveAverage} its moving average</p>
    </div>
  )
}

export default NasdaqButton;