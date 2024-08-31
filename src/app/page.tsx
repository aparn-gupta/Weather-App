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
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)


  const [suggestions, setSuggestions] = useState<string[]>([])
  const [localityWeatherData, setlocalityWeatherData] = useState<LocalityWeatherData>({
    temperature: 0,
    humidity: 0,
    wind_speed: 0,
    wind_direction: 0,
    rain_intensity: 0,
    rain_accumulation: 0,
});

  const [searchingByCoordinates, setSearchingByCoordinates] = useState<boolean>(false)
  const [searchResultsShowing, setSearchResultsShowing] = useState<boolean>(false)

  const [placeNameinResults, setPlaceNameinResults] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<JSX.Element | string>("")

  const [showSuggestions, setShowSuggestions] = useState<boolean>(true)

 
    const loader = <img src="https://th.bing.com/th/id/R.1e936fb298403d433b9831edb3b106b9?rik=Wjbt5gJd2xg40Q&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fsun-with-transparent-background%2fsun-with-transparent-background-20.png&ehk=yrmVQI624CWIh64pXelfY5RK2fWw9uk7NivXVeiVjyg%3d&risl=&pid=ImgRaw&r=0" className="w-24 h-24 animate-spin" />

 



  const handleSearchbyPlaceNameBtn = () => {
    setSearchingByCoordinates(false)

  }


  const ShowCheckWeatherBtn =  () => {
    setSearchingByCoordinates(prev => !prev)

  }


  const handleSearchbyCoordinatesBtn = () => {

 
    setSuggestions([])

  

      setSearchResultsShowing(true)
      
      fetchWeatherbyCoordinates(latitude, longitude)
      
     
      
    

      

  }

 const allLocalities: string[] = []
  let localityPlusCity
 for (let each of localities) {
 
      localityPlusCity = each.localityName 
  
  allLocalities.push(localityPlusCity)
 }




  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setShowSuggestions(true)
   
    setUserInput(e.target.value)
    const matchingPlaces = allLocalities.filter((option) => {
      return option.toLowerCase().startsWith(userInput.toLowerCase())
      
    })
    setSuggestions(matchingPlaces)
   
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
    setPlaceNameinResults("")  
    setDataLoaded(true)
    setlocalityWeatherData(weatherData.locality_weather_data)
   
    
   

  }

  catch (err: any) {
    
    setDataLoaded(false)
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
      setDataLoaded(true)
      setlocalityWeatherData(weatherData2.locality_weather_data)
     

      setSearchingByCoordinates(false)
      setSuggestions([]) 
      
    
     
    }
    catch (err : any) {
   
      setDataLoaded(false)
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
    setShowSuggestions(false)
    
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

 <div className=" grey-transparent w-full md:w-4/5 lg:w-1/2 text-white p-8 rounded-md  shadow-2xl">  

{ dataLoaded ?  <Info temperature = { localityWeatherData.temperature  } 
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

<div className= "w-screen" >  
<div className=  {` w-screen flex justify-center  ${searchResultsShowing ? "h-48 md:h-52 lg:h-24 bg-white absolute top-0 left-0 py-3 px-2 lg:px-8 " : " bg-white lg:flex-col lg:items-center h-screen mt-20 lg:mt-0" }`}      > 
  <div  className= {`${searchResultsShowing ? "  w-3/5 lg:w-full lg:flex lg:justify-start"  : "w-5/6 lg:w-auto"}`} >
 

  <div onClick={() => {setSearchResultsShowing(false)}}  className={`font-bold  flex  ${searchResultsShowing ? "text-2xl md:text-4xl lg:w-1/5 lg:text-3xl mt-3 justify-center lg:justify-start " : "text-2xl lg:text-8xl w-full  justify-center" }`}> <p className="text-blue-600"> L </p>  <p className="text-red-500"> i </p> <p className="text-yellow-500"> v </p> <p className="text-blue-600"> e </p> <p className={`text-green-600 ml-1.5   ${searchResultsShowing ? "md:ml-1.5" : " md:ml-4"}`}> W </p> <p className="text-red-500"> e </p> <p className="text-yellow-500"> a </p> <p className="text-blue-600"> t </p> <p className="text-red-500"> h </p > <p className="text-green-600"> e </p> <p className="text-yellow-500"> r </p> </div>

  <div className={`rounded-3xl  ${searchingByCoordinates ? "border-0"  :"border border-zinc-300 hover:shadow-md"  }   ${searchResultsShowing ? "w-full lg:ml-8  my-3 lg:my-0 ml-1 "  : "w-full  mt-6" }`}   >
  <input className=   {`bg-white w-full rounded-3xl px-3 pt-1.5 lg:py-4 outline-0  hover:border-0 ${searchingByCoordinates ? "hidden" : "block" }  `}  type="text" value={userInput} onChange={handleChange} name = "userInputPlace" id = "userInput"  placeholder="Type Locality e.g. Brookefields"/>
  <div className=  {`justify-between ${searchingByCoordinates ? "flex" : "hidden" } `} > 
  <input className= {` font-bold rounded-3xl p-2.5 outline-0 hover:shadow-md border border-zinc-300 ${searchResultsShowing ? " w-28 md:w-52 lg:w-5/12 mt-3" : "w-5/12"} `}  placeholder="Latitude"  type="text" name= "latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
  <input className= {`font-bold rounded-3xl p-2.5 outline-0 hover:shadow-md border border-zinc-300 ${searchResultsShowing ? " w-28  md:w-52 lg:w-5/12 mt-3" : "w-5/12"}`}  placeholder="Longitude"  type="text" name= "longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
    
      </div>
  {/* <div className="p-2 overflow-y-scroll max-h-64  rounded-3xl bg-white"> { suggestions &&  suggestions.map((item: string, i ) => <div key={i} className="hover:bg-slate-400" onClick={ () =>  {fetchWeatherfromUserInput(item)
  
}} > {item} </div>)}   */}
 
 
<div className= {`${showSuggestions? "block" : "hidden" }`}>
{suggestions &&  <div className= "p-2 overflow-y-scroll max-h-64  rounded-3xl bg-white flex justify-between">
   <div>   {  suggestions.map((item: string, i ) => <div key={i} className="hover:bg-slate-400" onClick={ () =>  {fetchWeatherfromUserInput(item)
  
}} > {item} </div>)}  
 
  </div>
 <img  className= "w-8 h-8 mr-1 hover:bg-slate-200 rounded-full p-2"  onClick={() => {setShowSuggestions(false)}} src="https://cdn-icons-png.flaticon.com/512/748/748122.png"/>
 
 
  </div>}
</div>


  


    
    
    
</div>

  <div className=  {` lg:max-h-12 flex w-full text-sm lg:text-base  ${searchResultsShowing?  "mt-6 md:mt-3 lg:justify-end" : "mt-8 justify-center" }`} > 
    <button className={`bg-zinc-100 hover:border hover:border-zinc-300 rounded-md py-2 px-3 lg:px-6 text-sm text-slate-800 hover:shadow-sm mr-4 ${searchResultsShowing ? `${searchingByCoordinates ? "block"  : "hidden"}`: "" }`} onClick= {handleSearchbyPlaceNameBtn}  > Search by Place Name </button> 
    <button className= {`${searchingByCoordinates?  "hidden" : "bg-zinc-100 hover:border hover:border-zinc-300 rounded-md py-2 lg:mt-3 px-3 lg:px-6 md:text-sm text-slate-800 hover:shadow-sm md:w-auto text-xs" }`}  onClick={ShowCheckWeatherBtn}> Search by Coordinates </button>
    <button className= {`${searchingByCoordinates ? "bg-zinc-100 hover:border hover:border-zinc-300 rounded-md py-2  px-3 lg:px-6 md:text-sm text-slate-800 hover:shadow-sm md:w-auto text-xs" : "hidden"  }`}  onClick={handleSearchbyCoordinatesBtn}> Check Weather </button> 
  
    
     </div>
     
  </div>
  
  </div>
</div>
   

  </div>
  );
}
