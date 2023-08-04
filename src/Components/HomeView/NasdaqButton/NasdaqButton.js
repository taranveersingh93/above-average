import { useEffect, useState } from 'react';
import './NasdaqButton.css';
import PropTypes from 'prop-types'

const NasdaqButton = ({lastClose, average}) => {
  const [aboveAverage, setAboveAverage] = useState('below');
  
  useEffect(() => {
    if (lastClose > average) {
      setAboveAverage('above');
    } else {
      setAboveAverage('below');
    }
  }, [])

  return (
    <div className='index-container'>
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

NasdaqButton.propTypes = {
  lastClose: PropTypes.number,
  average: PropTypes.number
}

export default NasdaqButton;