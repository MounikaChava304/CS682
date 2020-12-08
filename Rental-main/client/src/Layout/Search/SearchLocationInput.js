import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  var componentMap = {    
    locality: 'locality',
    administrative_area_level_1 : 'administrative_area_level_1',
  };
  const addressComponent = addressObject.address_components;
  let requestBody = {city:"", stateCode:"", formatedAddress:""};

  for(var i = 0; i < addressComponent.length; i++){
    var types = addressComponent[i].types; // get types array of each component 
    for(var j = 0; j < types.length; j++){ // loop through the types array of each component as types is an array and same thing can be indicated by different name.As you can see in the json object above 
          var component_type = types[j];
          // check if this type is in your component map.If so that means you want this component
          if(componentMap.hasOwnProperty(component_type)){            
            if(component_type === 'locality'){
              requestBody.city=addressComponent[i]['long_name'];
            }
            if(component_type === 'administrative_area_level_1'){
              requestBody.stateCode=addressComponent[i]['short_name'];
            }
          }
    }
  }
  requestBody.formatedAddress = query;
  axios
  .post("/api/rentals/calculator", requestBody)
  .then(res => {
    console.log(res);
  })
  .catch(err =>
    {
      console.log(err);
    }
  );

  console.log(addressObject);
}

function SearchLocationInput() {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [result, setResult] = useState("");
  
  
 


  useEffect(() => {
  
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="container">
      <h2 className="heading">Play Smart in Searching Home</h2>
      <label className="search-label" htmlFor="search-input">
      <input
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        placeholder="Enter a City"
        
        value={query}
      />
      <i className="fa fa-search search-icon" />
      </label>
    </div>
    
  );
}

export default SearchLocationInput;
