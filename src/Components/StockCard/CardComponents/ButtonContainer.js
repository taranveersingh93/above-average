import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './ButtonContainer.css';
const ButtonContainer = ({data, toggleStockFromWatchlist, symbol, id}) => {

    return (<div className="button-container d-flex flex-row flex-sm-column flex-md-row justify-content-between align-items-center">
        <Link 
            to={`/chart/${symbol}`} 
            className="btn btn-outline-success m-2 d-flex align-items-center justify-content-center"
        >
            <i className="bi bi-graph-up me-2"></i>
            Chart
        </Link>

        <button 
            onClick={() => toggleStockFromWatchlist(id)} 
            className={`btn m-2 ${data.saved ? 'btn-outline-danger' : 'btn-outline-primary'} d-flex align-items-center justify-content-center`}
        >
            <i className={`bi ${data.saved ? 'bi-bookmark-fill' : 'bi-bookmark'} me-2`}></i>
            {data.saved ? 'Remove' : 'Save'}
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