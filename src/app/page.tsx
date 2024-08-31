"use client"

import React from "react";
import axios from "axios";
import { localities } from "./localities";
import { useState } from "react";
import Info from "./Info";
import { useEffect, useRef } from "react";



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

  const [userInput, setUserInput] = useState<string>("")

  const [latitude, setLatitude] = useState<string>("")
  const [longitude, setLongitude] = useState<string>("")


  const [suggestions, setSuggestions] = useState<string[]>([])
  const [localityWeatherData, setlocalityWeatherData] = useState(null)

  const [searchingByCoordinates, setSearchingByCoordinates] = useState<boolean>(false)
  const [searchResultsShowing, setSearchResultsShowing] = useState<boolean>(false)

  const [placeNameinResults, setPlaceNameinResults] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<JSX.Element | string>("")

 
    const loader = <img src="https://th.bing.com/th/id/R.1e936fb298403d433b9831edb3b106b9?rik=Wjbt5gJd2xg40Q&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fsun-with-transparent-background%2fsun-with-transparent-background-20.png&ehk=yrmVQI624CWIh64pXelfY5RK2fWw9uk7NivXVeiVjyg%3d&risl=&pid=ImgRaw&r=0" className="w-24 h-24 animate-spin" />

 


  const handleSearchbyPlaceNameBtn = () => {
    setSearchingByCoordinates(false)

  }


  const ShowCheckWeatherBtn =  () => {
    setSearchingByCoordinates(prev => !prev)

  }


  const handleSearchbyCoordinatesBtn = () => {

    // setSearchingByCoordinates(true)
    setSuggestions([])

  
    //  if (searchingByCoordinates) {
      setSearchResultsShowing(true)
      
      fetchWeatherbyCoordinates(latitude, longitude)
      
     
      
    //  }

      

  }

 const allLocalities: string[] = []
  let localityPlusCity
 for (let each of localities) {
 
      localityPlusCity = each.localityName 
  
  allLocalities.push(localityPlusCity)
 }




  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
   
    setUserInput(e.target.value)
    const matchingPlaces = allLocalities.filter((option) => {
      return option.toLowerCase().startsWith(userInput.toLowerCase())
      
    })
    setSuggestions(matchingPlaces)
    // setIsOpen(true)

  }
  

 


  const fetchWeatherbyCoordinates = async (latitude: string, longitude: string) => {
    setErrorMessage(loader);

  try {
    const res = await axios({
      url: `https://www.weatherunion.com/gw/weather/external/v0/get_weather_data?latitude=${latitude}&longitude=${longitude}`,
      headers : {
        'X-Zomato-Api-Key': process.env.NEXT_PUBLIC_API_KEY
      },
      method: "get"
    })

    const weatherData = res.data
    setlocalityWeatherData(weatherData.locality_weather_data)
    
    // setUserInput("")

    // console.log(weatherData)

  }

  catch (err: any) {
  
    
    if (err.response) {
      handleStatus(err.response.status)
    } else if (err.request) {
      setErrorMessage(`No response received", ${err.request}` )
    } else {
      setErrorMessage(`Error: ${err.message}`)
    }
  

  }

  }

  
const handleStatus = (errStatus: any) => {
  switch (errStatus) {
    case 400 :
      setErrorMessage("Error: Invalid Request. Coordinates not found")
      break;
    case 401 :
      setErrorMessage("Error: Unauthorised")
      break;
    case 505 :
      setErrorMessage("Error: Server Error")
      break;
    default :
    setErrorMessage("An unknown error occured")
    
  }

}

  const fetchWeather = async (localityId: string) => {  
   
    
      setErrorMessage(loader);
   
    try {
      const response = await axios(`https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${localityId}`, {
        headers: {
          'X-Zomato-Api-Key': process.env.NEXT_PUBLIC_API_KEY
        },
        method: "get"
      
      })

    
      const weatherData2 = response.data  
      
      setlocalityWeatherData(weatherData2.locality_weather_data)
     

      
      setSuggestions([]) 
      setSearchingByCoordinates(prev => !prev)
      // setLatitude("")
      // setLongitude("")
     
    }
    catch (err : any) {
   
      
      if (err.response) {
        handleStatus(err.response.status)
      } else if (err.request) {
        setErrorMessage(`Response not Received, ${err.request}`)

      } else {
        setErrorMessage(`Error: ${err.message}`)
      }
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
    setPlaceNameinResults(placeName)  
    

  }


  return (
   
  <div className="w-screen h-screen relative"  >

   
  <div className={   ` h-screen w-screen relative  ${searchResultsShowing ? "block" : "hidden" }`}>

  <img src="https://i.gifer.com/origin/45/454ba38b4ce5b3fdc8796ed710769e69.gif"  className="h-screen w-screen absolute top-0 left-0 object-cover" />
  <div className=" w-screen h-screen absolute top-0 left-0 flex justify-center flex-col items-center" >

 <div className=" w-11/12 md:w-1/2 bg-blue-900 text-white p-8 rounded-md  shadow-2xl">  

{ localityWeatherData ?  <Info temperature = { localityWeatherData.temperature  } 
    humidity = { localityWeatherData.humidity  } 
    windSpeed = { localityWeatherData.wind_speed  } 
    rainAccumulation =  { localityWeatherData.rain_accumulation  }
    rainIntensity =  { localityWeatherData.rain_intensity  } 
    windDirection = { localityWeatherData.wind_direction  } 
    place = {placeNameinResults}
    />  : <div className="text-4xl flex justify-center text-center py-20"> {errorMessage} </div>  }

   </div>

   </div>
 </div>

<div className= "" >  
<div className=  {` w-screen  ${searchResultsShowing ? " h-16 md:h-24 bg-white absolute top-0 left-0 py-3 px-2 lg:px-8" : "flex justify-center md:flex-col md:items-center h-screen mt-20 lg:mt-0" }`}      > 
  <div  className= {`${searchResultsShowing ? "flex w-screen"  : "w-5/6 lg:w-auto "}`} >
  {/* <p className="text-8xl font-bold bg-gradient-to-tr from-red-500 via-blue-500 to-yellow-500 text-transparent bg-clip-text "> Live Weather </p> */}

  <div onClick={() => {setSearchResultsShowing(false)}}  className={`font-bold flex ${searchResultsShowing ? " text-sm lg:text-3xl mt-3" : "text-2xl lg:text-8xl " }`}> <p className="text-blue-600"> L </p>  <p className="text-red-500"> i </p> <p className="text-yellow-500"> v </p> <p className="text-blue-600"> e </p> <p className={`text-green-600 ml-1.5   ${searchResultsShowing ? "md:ml-1.5" : " md:ml-4"}`}> W </p> <p className="text-red-500"> e </p> <p className="text-yellow-500"> a </p> <p className="text-blue-600"> t </p> <p className="text-red-500"> h </p > <p className="text-green-600"> e </p> <p className="text-yellow-500"> r </p> </div>

  <div className={`rounded-3xl  ${searchingByCoordinates ? "border-0"  :"border border-zinc-300 hover:shadow-md"  }   ${searchResultsShowing ? "w-3/5 lg:w-4/5 mt-0 ml-1 lg:ml-5 "  : " w-full  mt-6" }`}   >
  <input className=   {` rounded-3xl px-3 pt-2.5 md:pt-4 outline-0   hover:border-0 ${searchingByCoordinates ? "hidden" : "block" }   ${searchResultsShowing ? " w-full lg:w-4/5"  : "w-full lg:w-3/4  " }`}  type="text" value={userInput} onChange={handleChange} name = "userInputPlace" id = "userInput"  placeholder="Type Locality e.g. Brookefields"/>
  <div className=  {`justify-between ${searchingByCoordinates ? "flex" : "hidden" } `} > 
  <input className= {`  rounded-3xl p-2.5 outline-0 hover:shadow-md border border-zinc-300 ${searchResultsShowing ? "w-56 mt-3" : "w-5/12"} `}  placeholder="Latitude"  type="text" name= "latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
  <input className= {` rounded-3xl p-2.5 outline-0 hover:shadow-md border border-zinc-300 ${searchResultsShowing ? "w-56 mt-3" : "w-5/12"}`}  placeholder="Longitude"  type="text" name= "longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
    
      </div>
  <div className="p-2 overflow-y-scroll max-h-64  rounded-3xl bg-white"> { suggestions &&  suggestions.map((item: string, i ) => <div key={i} className="hover:bg-slate-400" onClick={ () =>  {fetchWeatherfromUserInput(item)
  
}} > {item} </div>)}  
  </div>
    
    
    
</div>

  <div className=  {` lg:max-h-12 flex w-full text-sm lg:text-base  ${searchResultsShowing?  "mt-2 justify-end lg:mr-20" : "mt-8 justify-center" }`} > 
    <button className={`${searchResultsShowing ? `${searchingByCoordinates ? "bg-zinc-100 hover:border hover:border-zinc-300 rounded-md py-2 px-3 lg:px-6 text-sm text-slate-800 hover:shadow-sm mr-4 w-36 md:w-auto hidden md:block"  : "hidden"}`: "bg-zinc-100 hover:border hover:border-zinc-300 rounded-md py-2 px-3 lg:px-6 text-sm text-slate-800 hover:shadow-sm mr-4 w-36 md:w-auto hidden md:block"}`} onClick= {handleSearchbyPlaceNameBtn}  > Search by Place Name </button> 
    <button className= {`${searchingByCoordinates?  "hidden" : "bg-zinc-100 hover:border hover:border-zinc-300 rounded-md py-2  px-3 lg:px-6 md:text-sm text-slate-800 hover:shadow-sm w-10 md:w-auto text-xs" }`}  onClick={ShowCheckWeatherBtn}> Search by Coordinates </button>
    <button className= {`${searchingByCoordinates ? "bg-blue-500 hover:border hover:border-zinc-300 rounded-md py-2  px-3 lg:px-6 md:text-sm text-slate-800 hover:shadow-sm w-10 md:w-auto text-xs" : "hidden"  }`}  onClick={handleSearchbyCoordinatesBtn}> Check Weather </button> 
    
    
     </div>
  </div>
  
  </div>
</div>
   

  </div>
  );
}
