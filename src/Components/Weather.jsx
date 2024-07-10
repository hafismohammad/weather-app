import  { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import cloudy_sun from '../assets/cloudy_sum.png'
import humidity from '../assets/humidity.png';
import rain_sum from '../assets/rain_sun_icon.png';
import snow_icon from '../assets/snow_icon.png';
import sunny_weather from '../assets/sunny_weather_icon.png';
import wind from '../assets/wind.png';
import moon_night_icon from '../assets/moon_night_icon.png'
import night_storm_icon from '../assets/night_storm_icon.png'

import {ToastContainer , toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Weather() {
    const inputRef = useRef('')
    console.log(inputRef);
    const [weatherData, setWeatherData] = useState(false)

    const allIcons = {
        "01d":sunny_weather,
        "01n":moon_night_icon,
        "02d":cloudy_sun,
        "02n":moon_night_icon,
        "03d":sunny_weather,
        "03n":moon_night_icon,
        "04d":snow_icon,
        "04n":moon_night_icon,
        "09d":rain_sum,
        "09n":moon_night_icon,
        "10d":rain_sum,
        "10n":night_storm_icon,
        "11d":night_storm_icon,
        "11n":night_storm_icon,
    }
    
    const search = async (city) => {
        if(city === "") {
            toast.error('Please enter a city name');
        }
       try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        const response = await fetch(url)
        const data = await response.json();

        if (!response.ok) {
            toast.error(data.message);
            console.log(data.message);
            return;
        }

        console.log(data);
        const  icon = allIcons[data.weather[0].icon] || sunny_weather;
        setWeatherData({
            humidity:data.main.humidity,
            windSpeed:data.wind.speed,
            temperature:Math.floor(data.main.temp),
            location:data.name,
            icon:icon
        })
       } catch (error) {
        setWeatherData(false);
        console.error("Error in fetching weather data");
       }
    }

    useEffect(() => {
        search("London");
    },[])

  return (
    <div className='weather'> 
    <ToastContainer/>
      <div className="search-bar">
        <input ref={inputRef}  type="text" placeholder='Search' />
        <img src={search_icon} alt="Search Icon" onClick={() => search(inputRef.current.value)} />
      </div>
      {weatherData?<>
      <img src={weatherData.icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature} </p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className='col'>
        <img src={humidity} alt="" />
        <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
        </div>
        </div>
        <div className='col'>
        <img src={wind} alt="" />
        <div>
            <p>{weatherData.windSpeed}</p>
            <span>Wind Speed</span>
        </div>
        </div>
      </div>
      </> : <></>}
      
    </div>
  );
}

export default Weather;
