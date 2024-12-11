import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ButtonContainer = ({data, toggleStockFromWatchlist, symbol, id}) => {

    return (<div className="button-container d-flex">
    <Link 
        to={`/chart/${symbol}`} 
        className="btn btn-outline-success w-50 m-2 d-flex align-items-center justify-content-center"
    >
        <i className="bi bi-graph-up me-2"></i>
        View Chart
    </Link>

    <button 
        onClick={() => toggleStockFromWatchlist(id)} 
        className={`btn m-2 w-50 ${data.saved ? 'btn-outline-danger' : 'btn-outline-primary'} d-flex align-items-center justify-content-center`}
    >
        <i className={`bi ${data.saved ? 'bi-bookmark-fill' : 'bi-bookmark'} me-2`}></i>
        {data.saved ? 'Remove from watchlist' : 'Save to watchlist'}
    </button>
    </div>)
}

ButtonContainer.propTypes = {
    symbol: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    toggleStockFromWatchlist: PropTypes.func.isRequired
  };
  
export default ButtonContainer