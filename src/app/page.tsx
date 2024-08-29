"use client"

import React from "react";
import axios from "axios";
import { localities } from "./localities";

import { useState } from "react";
import Info from "./weatherinfo/page";



export default function Home() {


interface LocalityWeatherData
{
   temperature: number;
   humidity: number;
   wind_speed : number;
   wind_direction : number;
   rain_intensity: number;
   rain_accumulation : number
  
}

  const [userInput, setUserInput] = useState("")

  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")


  const [suggestions, setSuggestions] = useState([])
  const [localityWeatherData, setlocalityWeatherData] = useState(null)


//   const allLocalities: string[] = []
//   let localityPlusCity
//  for (let each of localities) {
//   localityPlusCity = `${each.localityName}, ${each.cityName}`
//   if (each.localityName.includes(each.cityName) ) {
//     {
//       localityPlusCity = each.localityName
  
//     }
//   }
//   allLocalities.push(localityPlusCity)
//  }


 const allLocalities: string[] = []
  let localityPlusCity
 for (let each of localities) {
 
      localityPlusCity = each.localityName 
  
  allLocalities.push(localityPlusCity)
 }




  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setUserInput(e.target.value)
    const matchingPlaces = allLocalities.filter((option) => {
      return option.startsWith(userInput)
      
    })
    setSuggestions(matchingPlaces)

  }
  

  // console.log(userInput)


  // const showPlace = (userInput: string) => {
  //   for (let i = 0; i < localities.length; i++) {
  //     if (localities[i].localityId === userInput) {
  //       setReqdLocality(localities[i].localityName)

  //     }

  //   }

  // }


  const fetchWeatherbyCoordinates = async (latitude: string, longitude: string) => {
  try {
    const res = await axios({
      url: `https://www.weatherunion.com/gw/weather/external/v0/get_weather_data?latitude=${latitude}&longitude=${longitude}`,
      headers : {
        'X-Zomato-Api-Key': process.env.NEXT_PUBLIC_API_KEY
      },
      method: "get"
    })

    console.log(res.data)
  }

  catch (err: any) {
    alert(err.message)

  }

  }

  



  const fetchWeather = async (localityId: string) => {  
    try {
      const response = await axios(`https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${localityId}`, {
        headers: {
          'X-Zomato-Api-Key': process.env.NEXT_PUBLIC_API_KEY
        },
        method: "get"
      
      })

      if (!response) {
        throw new Error
      }
  
      const dataa = response.data  
      
      setlocalityWeatherData(dataa.locality_weather_data)
      setSuggestions([])   
    }
    catch (err : any) {
      alert(err.message)
    }

  
  }

  let userQuery = ""
  const fetchWeatherfromUserInput = (placeName: string) => {
    
    for (let entry of localities) {
      if (entry.localityName === placeName) {
        userQuery = entry.localityId
      }
    }
    fetchWeather(userQuery)
    setUserInput(placeName)



  }


    // let {temperature : temperature, humidity: humidity, wind_speed : windSpeed, wind_direction : windDirection, rain_intensity : rainIntensity, rain_accumulation : rainAccumulation} 
    // = dataa.locality_weather_data 
        // console.log(temperature, humidity, windDirection, rainIntensity, rainAccumulation, windSpeed)
    // console.log(dataa.locality_weather_data.humidity)

  return (
   
  <div>
      <input className = "bg-blue-50" type="text" value={userInput} onChange={handleChange} name = "userInputPlace" placeholder="enter locality name" id = "userInput" />
      <button className="bg-pink-400" onClick={ () =>  {fetchWeatherfromUserInput(userInput) }}> Check weather</button>
      <button className="bg-pink-400" onClick={ () =>  {fetchWeatherbyCoordinates(latitude, longitude) }}> Check weather by Coordinates</button>
      
     

      <input className="bg-yellow-50"  type="text" name= "latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="latitude"/>
      <input className="bg-yellow-50"  type="text" name= "longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="longitude"/>

      




{ localityWeatherData   && 
  
 <div>

  <Info temperature = {localityWeatherData.temperature ? localityWeatherData.temperature : "Data Not Available" } 
    humidity = {localityWeatherData.humidity ? localityWeatherData.humidity : "Data Not Available" } 
    windSpeed = {localityWeatherData.wind_speed ? localityWeatherData.wind_speed : "Data Not Available" } 
    rainAccumulation =  {localityWeatherData.rain_accumulation ? localityWeatherData.rain_accumulation : "Data Not Available" }
    rainIntensity =  {localityWeatherData.rain_intensity ? localityWeatherData.rain_intensity : "Data Not Available" } 
    windDirection = {localityWeatherData.wind_direction ? localityWeatherData.wind_direction : "Data Not Available" } 
    />
   {/* <div className="bg-pink-200"> {localityWeatherData.humidity ? localityWeatherData.humidity : "Data Not Available" } </div>
  <div  className="bg-pink-200"> {localityWeatherData.wind_direction ? localityWeatherData.wind_direction : "Data Not Available" } </div>
  <div  className="bg-pink-200"> {localityWeatherData.temperature ? localityWeatherData.temperature : "Data Not Available" } </div>
  <div  className="bg-pink-200"> {localityWeatherData.wind_speed ? localityWeatherData.wind_speed : "Data Not Available" } </div>
  <div  className="bg-pink-200"> {localityWeatherData.rain_intensity ? localityWeatherData.rain_intensity : "Data Not Available" } </div>
  <div  className="bg-pink-200"> {localityWeatherData.rain_accumulation ? localityWeatherData.rain_accumulation : "Data Not Available" } </div> */}
 </div>


}
   



    
{suggestions.map((item, i) => <div key={i} className="hover:bg-slate-400" onClick={ () =>  {fetchWeatherfromUserInput(item)
  
 }} > {item} </div>)}  
   
  

      


      




  </div>
  );
}
