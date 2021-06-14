import React, { useState } from 'react'
export default function App() {
    let [error, setError] = useState(undefined);
    let [country, setCountry] = useState("");
    let [state, setState] = useState("");
    let [currentTemp, setCurrentTemp] = useState("");
    let [tempEmoji, setTempEmoji] = useState("");
    let [airQuality, setAirQuality] = useState("");
    let [airQualityEmoji, setAirQualityEmoji] = useState("");
    function getTempEmoji(temp) {
        if (temp > 0) return "☀️";
        else return "❄️"
    }
    function getAirEmoji(air) {
        if (air < 100) return "😁";
        else if (air < 150) return "😊";
        else if (air < 200) return "😐";
        else if (air < 250) return "😷";
        else if (air < 300) return "🤢";
        else return "💀";
    }
    let getData = async () => {
        let link = "https://api.weatherapi.com/v1/current.json?key=2ed3387f89ee4002bb4100043211504&q=";
        let name = document.getElementById("name").value;
        let last = "&aqi=yes";
        let response = await fetch(link + name + last);
        let value = await response.json();
        console.log(value, value.hasOwnProperty("error"));
        if (value.hasOwnProperty("error")) {
            setError(`${value.error.message}`);
            return;
        }
        setCountry(value["location"]["country"]);
        setState(value["location"]["name"]);
        let currentTemp = Number(value["current"]["temp_c"]).toFixed(2);
        setCurrentTemp(currentTemp);
        setTempEmoji(getTempEmoji(currentTemp));
        let currentQuality = Number(value["current"]["air_quality"]["pm10"]).toFixed(2)
        setAirQuality(currentQuality);
        setAirQualityEmoji(getAirEmoji(currentQuality));
        setError();
    }

    return (
        <div className="container">
            <h1 className="title">Weather & Pollution info</h1>
            <form>
                <div className="field">
                    <label>Location: </label>
                    <input type="text" name="name" id="name" />
                </div>
                <div className="button" onClick={getData}>
                    <p>Submit</p>
                </div>
            </form>
            <div className="box">
                {
                    !error ?
                        <div>
                            <div className="city">{country && `${state}, ${country}`}</div>
                            <div className="temp">{currentTemp && `Temperature: ${currentTemp}℃ ${tempEmoji}`}</div>
                            <div className="air">{airQuality && `Air Quality Index: ${airQuality} ${airQualityEmoji}`}</div>
                        </div > :
                        <div className="error">err: {error}</div>}
            </div>
        </div>
    )
}
