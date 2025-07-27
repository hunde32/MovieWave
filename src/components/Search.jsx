import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div className="search-input-wrapper">
        <img src="search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search 1000+ Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
