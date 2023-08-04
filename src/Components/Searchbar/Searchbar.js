import { useState } from 'react'
import crossIcon from '../../images/cross.png'
import './Searchbar.css'

const Searchbar = ({handleSearch, searchValue}) => {
 

  return (
    <div className="search-container">
      <input 
        className="searchbar"
        name='searchbar'
        placeholder="Search a stock symbol or name"
        type="text"
        onChange={event => handleSearch(event.target.value)}
        value={searchValue}
      ></input>
      <div className="cross-container">
        <img
          src={crossIcon}
          name='cross-icon'
          className="cross-icon"
          onClick={() => handleSearch('')}/>
      </div>
    </div>
  )
}

export default Searchbar;