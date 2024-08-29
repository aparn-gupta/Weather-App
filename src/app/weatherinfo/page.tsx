import React from 'react'


interface InfoProps {
    temperature: number; 
    humidity: number; 
    windSpeed: number; 
    rainAccumulation: number; 
    rainIntensity: number; 
    windDirection: number
}

const Info: React.FC<InfoProps> = ({temperature, humidity, windSpeed, rainAccumulation, rainIntensity, windDirection}) => {


  return (
    <div>
      <div className="bg-green-200">  {temperature} </div>
      <div className="bg-green-200"> {humidity} </div>
      <div className="bg-green-200"> {windSpeed} </div>
      <div className="bg-green-200"> {rainAccumulation} </div>
      <div className="bg-green-200"> {rainIntensity} </div>
      <div className="bg-green-200">{windDirection} </div>
      
    </div>
  )
}

export default Info
