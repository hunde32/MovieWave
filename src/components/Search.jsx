import React, { useState } from 'react'
import { useFormState } from 'react-dom'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="search">
        <img src="search.svg" alt="search"/>
        <input type="text" placeholder='Search 1000+ Movies'
         value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
       
    </div>
  )
}

export default Search