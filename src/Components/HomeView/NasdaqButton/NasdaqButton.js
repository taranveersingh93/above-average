import { useEffect, useState } from 'react';
import './NasdaqButton.css';

const NasdaqButton = ({lastClose, changePercent, average}) => {
  const [aboveAverage, setAboveAverage] = useState('below');
  
  useEffect(() => {
    console.log(average, lastClose)
    if (lastClose > average) {
      console.log('there')
      setAboveAverage('above');
    } else {
      console.log('here')
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