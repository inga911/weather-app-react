import { useState } from "react";
import "./Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiDaySunny,
  WiHail,
  WiFog,
  WiDayShowers,
} from "react-icons/wi";
import { PiCity } from "react-icons/pi";
import { BsSnow3, BsCloudSun, BsClouds } from "react-icons/bs";
import { LiaCloudSolid } from "react-icons/lia";
import { IoThunderstormOutline } from "react-icons/io5";

function Main() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b54eef16b5ec643b78f41d1f5587d25c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(urlAPI)
        .then((res) => {
          setData(res.data);
          setError("");
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setError("Location not found");
          } else {
            setError("An error occurred. Please try again.");
          }
        });
      setLocation("");
    }
  };

  const weatherIcons = {
    "clear sky": <WiDaySunny />,
    "few clouds": <BsCloudSun />,
    "scattered clouds": <LiaCloudSolid />,
    "broken clouds": <BsClouds />,
    "overcast clouds": <BsClouds />,
    "shower rain": <WiDayShowers />,
    "moderate rain": <WiHail />,
    "light rain": <WiHail />,
    "heavy intensity rain": <WiHail />,
    "very heavy rain": <WiHail />,
    "extreme rain": <WiHail />,
    "light intensity shower rain": <WiHail />,
    "heavy intensity shower rain": <WiHail />,
    "ragged shower rain": <WiHail />,
    thunderstorm: <IoThunderstormOutline />,
    clouds: <WiHail />,
    snow: <BsSnow3 />,
    "freezing rain": <BsSnow3 />,
    mist: <WiFog />,
  };

  return (
    <div className="main d-flex flex-column justify-content-center">
      <div className="bg-blur"></div>
      <div className="search-box d-flex justify-content-center">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter location"
          onKeyDown={searchLocation}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      {data.name && (
        <div className="container">
          <div className="top">
            <div className="location">
              <span className="icon">
                <PiCity />
              </span>
              <div>{data.name}</div>
            </div>
            <div className="temp-description d-flex justify-content-between">
              <div className="temp">
                {data.main && (
                  <>
                    <span className="icon">
                      <WiThermometer />
                    </span>
                    <div>{data.main.temp.toFixed()} °C</div>
                  </>
                )}
              </div>
              <div className="description">
                {data.weather && (
                  <>
                    <span className="icon">
                      {weatherIcons[data.weather[0].description] || ""}
                    </span>
                    <div>{data.weather[0].main}</div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bottom d-flex justify-content-around">
            <div className="feels">
              {data.main && <h1>{data.main.feels_like.toFixed()} °C</h1>}
              Feels like
            </div>
            <div className="humidity">
              {data.main && (
                <h1>
                  {data.main.humidity}
                  <WiHumidity />
                </h1>
              )}
              <div>Humidity</div>
            </div>
            <div className="wind">
              {data.wind && (
                <h1>
                  {data.wind.speed}
                  <WiStrongWind />
                </h1>
              )}
              <div>
                Wind <span>m/s</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
