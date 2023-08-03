import './StockCard.css';

const StockCard = ({symbol, name, data, id}) => {
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
      <div className='stock-info'>
        <button className='watchlist-btn'>{`${data.saved? "Remove from watchlist": "Save to watchlist"}`}</button>
      </div>
      
    </div>
  )
}

export default StockCard;