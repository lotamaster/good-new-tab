import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.scss";

export const getDayFromDt = (dt) => {
  let date = moment.utc(dt * 1000).local();
  return date.format("dddd");
};

export const App = () => {
  const [time, setTime] = useState(moment());
  const [weatherInfo, setWeatherInfo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let secTimer = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  useEffect(() => {
    const params = {
      lat: 39.09582149714131,
      lon: -77.20730189702883,
      apiKey: "be8000bae527da67016cb17469340704",
      units: "imperial",
      exclude: "minutely,hourly,alerts",
    };

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${params.lat}&lon=${params.lon}&appid=${params.apiKey}&units=${params.units}&exclude=${params.exclude}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.cod === 429) {
            // TODO: api key has been temporarily blocked, handle this better
            setError("API limit has been reached");
          } else {
            setWeatherInfo(result);
          }
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  const weatherInfoIsLoaded = Object.keys(weatherInfo).length !== 0;

  return (
    <>
      <div className="stars" />
      <div className="twinkling" />
      <div className="clouds" />

      <div className="content">
        <div className="date">{time.format("dddd | MMMM Do | YYYY")}</div>

        <div className="clock">{time.format("HH:mm:ss")}</div>

        <div className="weather-container">
          {error && "there was an error getting weather info"}
          {!error && !weatherInfoIsLoaded && "loading..."}
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

              {[1, 2, 3, 4, 5].map((value) => {
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
