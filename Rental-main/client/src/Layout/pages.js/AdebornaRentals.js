import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import SearchLocationInput from "../Search/SearchLocationInput";
import Footer from '../Footer';

function AdebornaRentals() {
  return (
    <>
    <div className="app">
      <SearchLocationInput
        onChange={() => null}
      />
    </div>
      
      <Cards />
      <Footer />
    </>
  );
}

export default AdebornaRentals;