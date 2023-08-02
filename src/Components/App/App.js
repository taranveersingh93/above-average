import './App.css';
import Navbar from '../Navbar/Navbar';
import {Routes, Route} from 'react-router-dom';
import HomeView from '../HomeView/HomeView';
import StocksView from '../StocksView/StocksView';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeView />}/>
        <Route path='/stocksView' element={<StocksView />}/>
      </Routes>
    </>
  )
}

export default App;
