import React from 'react';
import { Box } from '@material-ui/core';


const WeatherDay = ({min, max, weatherType, weatherIcon}) => {
  return (
    <div>
      <div>
        <img src={`https://developer.accuweather.com/sites/default/files/0${weatherIcon}-s.png`} />
      </div>
      <div>{weatherType}</div>
      <div>Low: {min} High: {max}</div>
    </div>

  );
};

export default WeatherDay;