import './App.css';
import Navbar from '../Navbar/Navbar';
import {Routes, Route} from 'react-router-dom';
import HomeView from '../HomeView/HomeView';
import StocksView from '../StocksView/StocksView';
import { fetchNasdaq, fetchNasdaqConstituents, fetchStock } from '../../apiCalls';
import { extractData } from '../../helperFunctions';
import { useEffect, useState } from 'react';


const App = () => {
  const [nasdaqData, setNasdaqData] = useState({});

  const assignNasdaqData = data => {
    setNasdaqData(data)
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeView nasdaqData={nasdaqData} assignNasdaqData={assignNasdaqData}/>}/>
        <Route path='/stocksView' element={<StocksView />}/>
      </Routes>
    </>
  )
}

export default App;
