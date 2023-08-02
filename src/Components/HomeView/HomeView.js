import './HomeView.css';
import IntroText from './IntroText/IntroText';
import SpButton from './SpButton/SpButton';
import { Link } from 'react-router-dom';
import { fetchSp500 } from '../../apiCalls';
import { useEffect, useState } from 'react';
import { extractData } from '../../helperFunctions';

const HomeView = () => {
  const [spData, setSpData] = useState({});
  const [waitingForData, setWaitingForData] = useState(true);
  const [dataFailed, setDataFailed] = useState(true);

  useEffect(() => {
    fetchSp500()
      .then(data => {
        const extractedData = extractData(data)
        setSpData(extractedData);
      })
      .catch(() => {
        setWaitingForData(false)
        setDataFailed(true);
      })
  }, [])

  useEffect(() => {
    if (spData.lastClose) {
      console.log(spData)
      setWaitingForData(false)
      setDataFailed(false);
    }
  }, [spData])

  return (
    <div className='home-view'>
      <IntroText />
        {waitingForData && <h2>Loading</h2>}
        {!waitingForData && dataFailed && <h2>Something went wrong</h2>}
      <Link to='/sp500'>
        {!waitingForData && !dataFailed && <SpButton changePercent={spData.changePercent} lastClose={spData.lastClose} average={spData.average}/>}
      </Link>
    </div>
  )
}

export default HomeView;