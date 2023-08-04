import './StockCard.css';
import { Link } from 'react-router-dom';

const StockCard = ({symbol, name, data, id, toggleStockFromWatchlist}) => {
  return (
    <div className='stock-card' id={id}>
      <div className='stock-info'>
        <p>Rank</p>
        <h3>{id}</h3>
      </div>
      <div className='stock-info'>
        <p>{name}</p>
        <h3>{symbol}</h3>
      </div>
      <div className='stock-info'>
        <p>Last Close</p>
        <h3>{data.lastClose}</h3>
      </div>
      <div className='stock-info'>
        <p>Last Day Change</p>
        <h3 className={`${data.changePercent>0? "dark-green-text": "red-text"}`}>{data.changePercent}%</h3>
      </div>
      <div className='stock-info'>
        <p>150d Return</p>
        <h3 className={`${data.longTermReturn>0? "dark-green-text": "red-text"}`}>{data.longTermReturn}%</h3>
      </div>
      <div className='button-container'>
        <Link to={`/${symbol}`}><button className='green-watchlist-btn chart-btn'>Open Chart</button></Link>
        <button onClick={() => {toggleStockFromWatchlist(id)}} className={`${data.saved? "red-watchlist-btn watchlist-btn": "green-watchlist-btn watchlist-btn"}`}>{`${data.saved? "Remove from watchlist": "Save to watchlist"}`}</button>
      </div>
      
    </div>
  )
}

export default StockCard;