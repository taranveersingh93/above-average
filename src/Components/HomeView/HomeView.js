import './HomeView.css';
import IntroText from './IntroText/IntroText';
import NasdaqButton from './NasdaqButton/NasdaqButton';
import { Link } from 'react-router-dom';
import { fetchNasdaq } from '../../apiCalls';
import { useEffect, useState } from 'react';
import { extractData } from '../../helperFunctions';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import PropTypes from 'prop-types';

const HomeView = ({nasdaqData, assignNasdaqData}) => {
  const [waitingForData, setWaitingForData] = useState(true);
  const [dataFailed, setDataFailed] = useState(true);
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchNasdaq()
      .then(data => {
        const extractedData = extractData(data);
        assignNasdaqData(extractedData);
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage(error.message);
        setWaitingForData(false);
        setDataFailed(true);
      })
  }, [])

  useEffect(() => {
    if (nasdaqData.lastClose) {
      setWaitingForData(false)
      setDataFailed(false);
    }
  }, [nasdaqData])

  return (
    <div className='home-view'>
      <IntroText />
        {waitingForData && <LoadSpinner />}
        {!waitingForData && dataFailed && <h2>{errorMessage}</h2>}
      <Link to='/stocksView'>
        {!waitingForData && !dataFailed && <NasdaqButton changePercent={nasdaqData.changePercent} lastClose={nasdaqData.lastClose} average={nasdaqData.average}/>}
      </Link>
    </div>
  )
}

HomeView.propTypes = {
  nasdaqData: PropTypes.object,
  assignNasdaqData: PropTypes.func
}
export default HomeView;