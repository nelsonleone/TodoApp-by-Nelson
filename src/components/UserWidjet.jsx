import { useEffect } from "react";
import { useState } from "react";
import  HamburgerIcon  from 'hamburger-react';

export default function API_Time({userLocation,loaded}){
   const [weatherData,setWeatherData] = useState(
      localStorage.getItem("weatherData") !== null ? JSON.parse(localStorage.getItem("weatherData")) : ""
   )
   const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
   const date = new Date()
   const today = date.toLocaleDateString("en-US",dateOptions)
   const URL = `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=6459870ec6da6883c32cb1c3c4dfc722`;
   
   const [widjetDisplay,setWidjetDisplay] = useState(window.innerWidth > 600 ? true : false)

   useEffect(() => {
      fetch(URL)
      .then(resp => {
         if(resp.ok){
            return resp.json()
         }
      })
      .then(data => {
         setWeatherData(data)

         // saving user Weather details
         localStorage.setItem("weatherData",JSON.stringify(data))
      })
      .catch(function(err){
         setWeatherData("")
      })
   },[loaded])

   function retryWeatherFetch(){
      fetch(URL)
      .then(resp => {
         if(resp.ok){
            return resp.json()
         }
      })
      .then(data => {
         setWeatherData(data)
      })
      .catch(function(err){
         setWeatherData("")
      })
   }
   
  function resize(){
     window.addEventListener('resize',() => {
        window.innerWidth > 600 ? setWidjetDisplay(true) :  setWidjetDisplay(false)
     })
   }

   useEffect(() => {
      if(weatherData !== ""){
         localStorage.setItem("weatherData",JSON.stringify(weatherData))
      }
      resize()
      
      return ()=> window.removeEventListener('resize',resize)
   })
   
   const widjetDisplayStyle = { 
      display: widjetDisplay ? "block" : "none",
   }

   function handleMobileWidjetDisplay(){
      setWidjetDisplay(prevState => prevState = !prevState)
   }
   
   



   return(
      loaded && 
      <>
         <button className="toggle-widjet" aria-controls="widjet" aria-expanded={false} onClick={(e) => handleMobileWidjetDisplay(e)}>
         <HamburgerIcon color="#FFF" open={false}/>
         </button>

         <div className="weather-section" id="widjet" style={widjetDisplayStyle} aria-expanded={widjetDisplay ? "true" : "false"}>
            {weatherData === "" ? 
               <div className="weather-error">
                  <p>An Error Occured......retry</p>
                  <button onClick={retryWeatherFetch}>Retry</button>
               </div>
               :
               <>
               <h1>{weatherData.name}</h1>
               <p>{weatherData.sys.country}</p>
               <div className="weather-details">
                  <div>
                  <span className="condition">Condition: 
                     <span>
                        {weatherData.weather[0].main}
                     </span>
                  </span>
                  <img src={"http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png"} width={60}   alt="icon"/>
                  </div>
                  <span className="condition-description">Desc:
                     <span>
                     {weatherData.weather[0].description}
                     </span>
                  </span>
                  <span className="temperature">Temperature: 
                     <span>
                        {Math.round(weatherData.main.temp - 273)}&deg;
                     </span>
                  </span>
               </div>
               </>
            }
         </div>
      <div className="time-display">
         <h2>{today}</h2>
      </div>
      </>
   )
}
