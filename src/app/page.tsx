"use client"

import React from "react";
import axios from "axios";
import { localities } from "./localities";

import { useState } from "react";
import Info from "./Info";



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



  const [searchingByCoordinates, setSearchingByCoordinates] = useState(false)
  const [searchResultsShowing, setSearchResultsShowing] = useState(false)
 



  const handleSearchbyPlaceNameBtn = () => {
    setSearchingByCoordinates(false)

  }


  const handleSearchbyCoordinatesBtn = () => {

    setSearchingByCoordinates(true)

    if (searchingByCoordinates) {
      fetchWeatherbyCoordinates(latitude, longitude)
    }

  }





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
    setSearchResultsShowing(true)
    
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
   
  <div className="w-screen h-screen relative">
      {/* <input className = "bg-blue-50" type="text" value={userInput} onChange={handleChange} name = "userInputPlace" placeholder="enter locality name" id = "userInput" />
      <button className="bg-pink-400" onClick={ () =>  {fetchWeatherfromUserInput(userInput) }}> Check weather</button>
      <button className="bg-pink-400" onClick={ () =>  {fetchWeatherbyCoordinates(latitude, longitude) }}> Check weather by Coordinates</button>
      
     

      <input className="bg-yellow-50"  type="text" name= "latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="latitude"/>
      <input className="bg-yellow-50"  type="text" name= "longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="longitude"/> */}

      





{ localityWeatherData   && 
  <div className={   ` h-screen w-screen relative  ${searchResultsShowing ? "block" : "hidden" }`}>



  

  <img src="https://i.gifer.com/origin/45/454ba38b4ce5b3fdc8796ed710769e69.gif"  className="h-screen w-screen absolute top-0 left-0 object-cover" />
  <div className=" w-screen h-screen absolute top-0 left-0 flex justify-center flex-col items-center" >

 <div className=" w-11/12 md:w-1/2">  

 <Info temperature = { localityWeatherData.temperature  } 
    humidity = { localityWeatherData.humidity  } 
    windSpeed = { localityWeatherData.wind_speed  } 
    rainAccumulation =  { localityWeatherData.rain_accumulation  }
    rainIntensity =  { localityWeatherData.rain_intensity  } 
    windDirection = { localityWeatherData.wind_direction  } 
    place = {userInput}
    />
  
  
  
  
  
  
  
  
   </div>




   </div>
 </div>



}



   



    





<div className= "" >
<div className=  {` w-screen  ${searchResultsShowing ? " h-16 md:h-24 bg-white absolute top-0 left-0 py-3 px-2 lg:px-8" : "flex justify-center md:flex-col md:items-center h-screen mt-20 lg:mt-0" }`}      > 
  <div  className= {`${searchResultsShowing ? "flex w-screen"  : "w-5/6 lg:w-auto "}`} >
  {/* <p className="text-8xl font-bold bg-gradient-to-tr from-red-500 via-blue-500 to-yellow-500 text-transparent bg-clip-text "> Live Weather </p> */}

  <div className={`font-bold flex ${searchResultsShowing ? " text-sm lg:text-3xl mt-3" : "text-2xl lg:text-8xl " }`}> <p className="text-blue-600"> L </p>  <p className="text-red-500"> i </p> <p className="text-yellow-500"> v </p> <p className="text-blue-600"> e </p> <p className="text-green-600  ml-1.5 md:ml-4"> W </p> <p className="text-red-500"> e </p> <p className="text-yellow-500"> a </p> <p className="text-blue-600"> t </p> <p className="text-red-500"> h </p > <p className="text-green-600"> e </p> <p className="text-yellow-500"> r </p> </div>


  <div className={`rounded-3xl  ${searchingByCoordinates ? "border-0"  :"border border-zinc-300 hover:shadow-md"  }   ${searchResultsShowing ? "w-3/5 lg:w-4/5 mt-0 ml-1 lg:ml-5 "  : " w-full  mt-6" }`}   >
  <input className=   {` rounded-3xl px-3 pt-2.5 md:pt-4 outline-0   hover:border-0 ${searchingByCoordinates ? "hidden" : "block" }   ${searchResultsShowing ? " w-3/5  lg:w-4/5"  : "w-full lg:w-3/4  " }`}  type="text" value={userInput} onChange={handleChange} name = "userInputPlace" id = "userInput"  placeholder="Type Locality e.g. Brookefields"/>
  <div className=  {`justify-between ${searchingByCoordinates ? "flex" : "hidden" } `} > 
  <input className= {`  rounded-3xl p-2.5 outline-0 hover:shadow-md border border-zinc-300 ${searchResultsShowing ? "w-56 mt-3" : "w-5/12"} `}  placeholder="Latitude" />
  <input className= {` rounded-3xl p-2.5 outline-0 hover:shadow-md border border-zinc-300 ${searchResultsShowing ? "w-56 mt-3" : "w-5/12"}`}  placeholder="Longitude"/>
    
      </div>
  <div className="p-2 overflow-y-scroll max-h-64  rounded-3xl bg-white"> {suggestions.map((item, i) => <div key={i} className="hover:bg-slate-400" onClick={ () =>  {fetchWeatherfromUserInput(item)
  
}} > {item} </div>)}  
  </div>
    
    
    
</div>

  <div className=  {` lg:max-h-12 flex w-full text-sm lg:text-base  ${searchResultsShowing?  "mt-2 justify-end lg:mr-20" : "mt-8 justify-center" }`} > <button className="bg-zinc-100 hover:border hover:border-zinc-300 rounded-md py-2 px-3 lg:px-6 text-sm text-slate-800 hover:shadow-sm mr-4 w-36 md:w-auto hidden md:block" onClick= {handleSearchbyPlaceNameBtn}  > Search by Place Name </button> <button className="bg-zinc-100 hover:border hover:border-zinc-300 rounded-md py-2  px-3 lg:px-6 md:text-sm text-slate-800 hover:shadow-sm w-10 md:w-auto   text-xs "  onClick={handleSearchbyCoordinatesBtn}> Search by Coordinates </button> </div>
  </div>
  
  </div>
</div>
   
  

      


      




  </div>
  );
}
