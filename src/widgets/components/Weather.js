import React, { useState } from 'react';
import Conditions from '../style/Conditions';

const Weather = () => {
    let [responseObj, setResponseObj] = useState({});
    function getWeather() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '898d973dcfmsha88463f2f75ced6p119d36jsnc4f06d39de31',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        
        fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Z%C3%BCrich', options)
        .then(response => response.json())
        .then((data) => {
            setResponseObj(data)
            console.log(responseObj)
        })
            .catch(err => console.error(err));
   }

   return (
    <div>
    <h2>Jetzigs Wetter in Züri</h2>
    <div>
    </div>
    <button onClick={getWeather}>Hols Wetter</button>
    <div>
     
            
        
            <p><strong>{responseObj.name}</strong></p>
            <p>Es isch {Math.round()} Grad dusse.</p>
        </div>
    </div>
    
   )
}

export default Weather;