import PropTypes from "prop-types";

const TopSection = ({id, name, data}) => {
    return (
        <div className="d-flex justify-content-around p-3 align-items-center">
          <div className="d-flex flex-column align-items-center">
            <div className="text-center">
                <h5 className="font-weight-300">
                  <span className="small-text">#{id}&nbsp;&nbsp;&nbsp;</span>
                  {name}
                </h5>
            </div>
            <p className="font-weight-300 small-text text-center">
              Last Close: {data?.lastClose}
            </p>
          </div>
        </div>
    )
}

TopSection.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
};

export default TopSection