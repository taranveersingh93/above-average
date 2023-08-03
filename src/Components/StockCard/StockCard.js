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
        <p>Change</p>
        <h3>{data.changePercent}</h3>
      </div>
      <div className='stock-info'>
        <p>150d Return</p>
        <h3>{data.longTermReturn}%</h3>
      </div>
      
    </div>
  )
}

export default StockCard;