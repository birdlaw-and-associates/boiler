import React, { useEffect, useState } from 'react';
import WeatherDay from './WeatherDay.jsx';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
const apiKey = require('../../../config/keys').api.accuweather;


const Weather = () => {
  const [item] = useState(null);
//API for
//https://openweathermap.org/forecast5

  const locationKey = `30307_PC`;
  const [weatherInfo, setWeatherInfo] = useState();

  //api expects two digit number to represent icon filename
  const padNum = (num) => {
    const stringNum = num + '';
    console.log(typeof stringNum);
    const stringLength = stringNum.length;

    if (stringLength === 1) {
      return '0' + stringNum; // 1 --> 01
    } else {
      return stringNum; // 12 --> 12
    }
  };
  //Weather dates, today, tomorrow, 11/27, 11/28, etc

  //only gets called when component mounts
  useEffect(() => {
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}?apikey=${apiKey}`)
      .then(res => res.json())
      .then(res => setWeatherInfo(res.DailyForecasts.map(daily => {
        return {
          min: daily.Temperature.Minimum.Value,
          max: daily.Temperature.Maximum.Value,
          weatherType: daily.Day.IconPhrase,
          weatherIcon: daily.Day.Icon,
          // weatherIcon: padNum(daily.Day.Icon)
        };
      })))
      .catch((err) => { console.log('Could not retrieve weather data', err); });
  }, []);

  //If api fetch fails, component will not render.
  return (
    <div>
      <Grid direction="rows" container justifyContent="flex-end">
        {!!weatherInfo && weatherInfo.map((i, index) => (
          <div key={index}>
            <Grid>
              <Box sx={{
                display: 'flex',
                alignContent: 'flex-end',
                bgcolor: 'primary.main',
                color: 'white',
                border: 1,
                borderRadius: 3,
                textAlign: 'center',
                fontSize: '1rem',
                p: 1,
                m: 2,
              }}>

                <WeatherDay
                  min={i.min}
                  max={i.max}
                  weatherType={i.weatherType}
                  weatherIcon={i.weatherIcon} />
              </Box>
            </Grid>
          </div>
        ))}
      </Grid>
    </div>
  );

};

export default Weather;
