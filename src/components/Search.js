import React, { useState, useEffect, useCallback, useRef } from "react";
import { NavLink } from "react-router-dom";

import api from "../Axios";
import Loader from "./Loader";

function Search() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus();
  };
  const handleSearch = useCallback(
    ({ target: { value } }) => {
      if (!value) {
        setFilteredCoins([]);
        return;
      }
      setSearchText(value);
      let filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCoins(filteredCoins);
    },
    [searchText]
  );
  const handleClick = () => {
    setSearchText("");
    setFilteredCoins([]);
    handleFocus();
  };
  useEffect(() => {
    api.get("/coins/list").then((res) => setCoins(res.data));
    handleFocus();
  }, []);

  return (
    <div className="col-md-10 col-lg-4 px-0 form-group mb-5 mx-auto dropdown ">
      <input
        ref={inputRef}
        type="text"
        className="form-control  custom-search "
        placeholder="Search Coins"
        onChange={handleSearch}
      />
      {searchText.length > 0 && (
        <div className="dropdown-menu show w-100">
          {filteredCoins.length && searchText.length > 0 ? (
            filteredCoins.map((coin) => (
              <NavLink
                to={`${coin.id}`}
                key={coin.id}
                className="dropdown-item "
                onClick={handleClick}
              >
                {coin.name}
              </NavLink>
            ))
          ) : (
            <div className="py-5">
              <Loader />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
