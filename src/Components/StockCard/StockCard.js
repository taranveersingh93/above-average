import './StockCard.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAboveAverage } from '../../helperFunctions';

const StockCard = ({ symbol, name, data, id, toggleStockFromWatchlist }) => {
  return (
    <div className="card position-relative stock-card futuristic-card shadow-lg rounded p-3 mb-4 h-100">
      <div className='position-absolute top-0 start-0 ms-2 bg-danger
      
      text-white py-1 px-3 rounded-3 z-index-10'>
      <span>{symbol}</span>
      </div>
      <div className="card-body">
        <h5 className="card-title text-center futuristic-text">{name}</h5>
        <h6 className="card-subtitle mb-2 text-center futuristic-text">{symbol}</h6>
        
        <p className="card-text futuristic-text">
          <strong>Last Close: </strong>
          <span>{data?.lastClose}</span>
        </p>
        
        <p className="card-text futuristic-text">
          <strong>Change: </strong>
          <span className={data?.changePercent >= 0 ? "text-success" : "text-danger"}>
            {data?.changePercent}%
          </span>
        </p>

        <p className="card-text futuristic-text">
          <strong>Rating: </strong>
          <span className={isAboveAverage(data) ? "text-success" : "text-danger"}>
            {isAboveAverage(data) ? "Above Average" : "Below Average"}
          </span>
        </p>

        <div className="button-container">
          <Link to={`/chart/${symbol}`} className="btn btn-outline-neon w-100 mb-2">
            View Chart
          </Link>
          
          <button 
            onClick={() => toggleStockFromWatchlist(id)} 
            className={`btn w-100 ${data.saved ? 'btn-danger' : 'btn-success'}`}
          >
            {data.saved ? 'Remove from watchlist' : 'Save to watchlist'}
          </button>
        </div>
        <div className='align-self-center'>
        <i className="bi bi-wrench text-primary"></i>
        </div>
      </div>
    </div>
  );
}

StockCard.propTypes = {
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  toggleStockFromWatchlist: PropTypes.func.isRequired
};

export default StockCard;
