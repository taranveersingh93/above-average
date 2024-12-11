import PropTypes from "prop-types";

const TopSection = ({id, name, data}) => {
    return (
        <div className="d-flex justify-content-around p-3 align-items-center">
          <p className="rank-text fs-3">
            #{id}
          </p>
          <div className="d-flex flex-column align-items-center">
            <h5 className="font-weight-300 text-center">{name}</h5>
            <p className="font-weight-300 small-text text-center">Last Close: {data?.lastClose}</p>
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