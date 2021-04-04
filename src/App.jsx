import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.scss";

const App = () => {
  const [time, setTime] = useState(moment().format("hh:mm:ss"));
  const [weatherInfo, setWeatherInfo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let secTimer = setInterval(() => {
      setTime(moment().format("hh:mm:ss"));
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  const lat = 39.07760037562836;
  const lon = -77.22042258515692;
  const apiKey = "be8000bae527da67016cb17469340704";
  const units = "imperial";
  const exclude = "minutely,hourly,alerts";
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&exclude=${exclude}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setWeatherInfo(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      );
  }, [apiUrl]);

  console.log(weatherInfo);
  const weatherInfoIsLoaded = Object.keys(weatherInfo).length !== 0;

  // const weatherInfo = useMemo(() => {
  //   return {
  //     today: { low: 10, high: 20 },
  //     day_two: {},
  //     day_three: {},
  //     day_four: {},
  //     day_five: {},
  //     day_six: {},
  //   };
  // }, []);

  return (
    <>
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>

      <div className="content">
        <div className="clock">{time}</div>

        {weatherInfoIsLoaded && (
          <div className="weather-container">
            <div className="todays-weather">
              <div className="icon">
                <img
                  src="/logo192.png"
                  height="150"
                  width="150"
                  alt="weather-icon"
                />
              </div>

              <div className="description">
                <div className="title">
                  {Math.round(weatherInfo.current.temp)}°F Overcast Clouds
                </div>

                <div className="subtext">Low: 39°F High: 44°F</div>
                <div className="subtext">5mph wind gust</div>
                <div className="subtext">5% humidity</div>
                <div className="subtext">90% cloud cover</div>
              </div>
            </div>

            <div className="weather-item">
              <div className="other-day-weather">
                <div className="day">Monday</div>
                <img
                  className="icon"
                  src="/logo192.png"
                  height="100"
                  width="100"
                  alt="weather-icon"
                />
                <div className="description">Low: 40°F High: 66°F</div>
              </div>
            </div>

            <div className="weather-item">
              <div className="other-day-weather">
                <div className="day">Tuesday</div>
                <img
                  className="icon"
                  src="/logo192.png"
                  height="100"
                  width="100"
                  alt="weather-icon"
                />
                <div className="description">Low: 40°F High: 66°F</div>
              </div>
            </div>

            <div className="weather-item">
              <div className="other-day-weather">
                <div className="day">Wednesday</div>
                <img
                  className="icon"
                  src="/logo192.png"
                  height="100"
                  width="100"
                  alt="weather-icon"
                />
                <div className="description">Low: 40°F High: 66°F</div>
              </div>
            </div>

            <div className="weather-item">
              <div className="other-day-weather">
                <div className="day">Thursday</div>
                <img
                  className="icon"
                  src="/logo192.png"
                  height="100"
                  width="100"
                  alt="weather-icon"
                />
                <div className="description">Low: 40°F High: 66°F</div>
              </div>
            </div>

            <div className="weather-item">
              <div className="other-day-weather">
                <div className="day">Friday</div>
                <img
                  className="icon"
                  src="/logo192.png"
                  height="100"
                  width="100"
                  alt="weather-icon"
                />
                <div className="description">Low: 40°F High: 66°F</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
