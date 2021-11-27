import React, { useState, UseEffect } from "react";
import axios from 'axios';

const Store = ({ store }) => {
  
  
  
  const showInMapClicked = () => {
    window.open(`https://maps.google.com?q=${store.coordinates.latitude},${store.coordinates.longitude}` );
  };

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img className="card-img-top store-image" src={store.image_url}></img>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{store.name}</h2>
            <div className="card-text" style={{marginBottom: '10px'}}>
              <h5 className="store-address" onClick={showInMapClicked}>
                {/* {store.location.display_address[0]}<br />{store.location.display_address[1]} */}
              </h5>
            </div>
            <div className="card-text">
              <p className="phone-number">{store.display_phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Store;