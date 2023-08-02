import './StockCard.css';

const StockCard = ({symbol, name, data, id}) => {
  return (
    <div className='stock-card' id={id}>
      <div className='name-symbol'>
        <h3>{symbol}</h3>
        <p>{name}</p>
      </div>
      <p>Last Close: {data.lastClose}</p>
      <p>Change: {data.changePercent}</p>
      <p>150d Return: {data.longTermReturn}%</p>
    </div>
  )
}

export default StockCard;