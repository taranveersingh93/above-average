import { useEffect, useState } from 'react';
import './SpButton.css';

const SpButton = ({lastClose, changePercent, average}) => {
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
        (Click to view S&P 500 constituents)
      </p>
      <h2 className='index-title'>S&P 500</h2>
      <p>Last close: {lastClose}</p>
      <p>Moving average: {average}</p>
      <p className={`${aboveAverage==="above"? "green-text": "red-text"}`}>S&P 500 is {aboveAverage} its moving average</p>
    </div>
  )
}

export default SpButton;