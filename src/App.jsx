import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.scss";

export const getDayFromDt = dt => {
  let date = moment.utc(dt * 1000).local();
  return date.format("dddd");
};

export const App = () => {
  const [time, setTime] = useState(moment().format("HH:mm:ss"));
  const [weatherInfo, setWeatherInfo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let secTimer = setInterval(() => {
      setTime(moment().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  const params = {
    lat: 39.07760037562836,
    lon: -77.22042258515692,
    apiKey: "be8000bae527da67016cb17469340704",
    units: "imperial",
    exclude: "minutely,hourly,alerts"
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${params.lat}&lon=${params.lon}&appid=${params.apiKey}&units=${params.units}&exclude=${params.exclude}`
    )
      .then(res => res.json())
      .then(
        result => {
          setWeatherInfo(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setError(error);
        }
      );
  }, []);

  const weatherInfoIsLoaded = Object.keys(weatherInfo).length !== 0;

  return (
    <>
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>

      <div className="content">
        <div className="clock">{time}</div>

        <div className="weather-container">
          {error && "there was an error getting weather info"}
          {!error && weatherInfoIsLoaded && (
            <>
              <div className="todays-weather">
                <div className="icon">
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherInfo.daily[0].weather[0].icon}@2x.png`}
                    height="150"
                    width="150"
                    alt="weather-icon"
                  />
                </div>

                <div className="description">
                  <div className="title">
                    {Math.round(weatherInfo.current.temp)}°F Overcast Clouds
                  </div>

                  <div className="subtext">
                    Low: {Math.round(weatherInfo.daily[0].temp.min)}°F High:{" "}
                    {Math.round(weatherInfo.daily[0].temp.max)}°F
                  </div>
                  <div className="subtext">
                    {Math.round(weatherInfo.daily[0].wind_speed)}mph wind speed
                  </div>
                  <div className="subtext">
                    {Math.round(weatherInfo.daily[0].humidity)}% humidity
                  </div>
                  <div className="subtext">
                    {Math.round(weatherInfo.daily[0].clouds)}% cloud cover
                  </div>
                </div>
              </div>

              {[1, 2, 3, 4, 5].map(value => {
                return (
                  <div className="weather-item" key={value}>
                    <div className="other-day-weather">
                      <div className="day">
                        {getDayFromDt(weatherInfo.daily[value].dt)}
                      </div>
                      <img
                        className="icon"
                        src={`http://openweathermap.org/img/wn/${weatherInfo.daily[value].weather[0].icon}@2x.png`}
                        height="100"
                        width="100"
                        alt="weather-icon"
                      />
                      <div className="description">
                        Low: {Math.round(weatherInfo.daily[value].temp.min)}°F
                        High: {Math.round(weatherInfo.daily[value].temp.max)}°F
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
