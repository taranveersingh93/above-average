import './Searchbar.css';
import PropTypes from 'prop-types';

const Searchbar = ({handleSearch, searchValue}) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className='col-12 col-sm-6 font-weight-100'>
          <input
            type="text"
            className="form-control form-control-lg rounded-pill "
            placeholder="Search a stock name or a symbol..."
            value={searchValue}
            onChange={event => handleSearch(event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

Searchbar.propTypes = {
  handleSearch: PropTypes.func,
  searchValue: PropTypes.string
}

export default Searchbar;