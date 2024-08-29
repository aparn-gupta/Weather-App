import React from 'react'


interface InfoProps {
    temperature: number; 
    humidity: number; 
    windSpeed: number; 
    rainAccumulation: number; 
    rainIntensity: number; 
    windDirection: number;
    place: string
}

const Info: React.FC<InfoProps> = ({temperature, humidity, windSpeed, rainAccumulation, rainIntensity, windDirection, place}) => {

//check icons
  return (
    <div className=' bg-blue-900 text-white p-8 rounded-md'>
    <div className='flex justify-center'>
   <div>
   <p className=" text-6xl font-bold ">  {temperature} &deg;C </p>
   <p className=" text-xl font-bold text-center mt-4">  {place} </p>
   </div>
  



    </div>
   
  

    <div className=' w-full'>
   <div>
   <div className='flex justify-between w-full text-xl'>
     <div className="flex h-20">  <img  src=' https://cdn-icons-png.flaticon.com/512/1779/1779817.png ' alt='humidity-icon' className='w-12 h-12'/> <p className='mt-4 ml-4'>  {humidity ? `Humdity : ${humidity}%` : "Data N/A" }  </p> </div>
   <div className="flex h-20"> <img  src='https://www.fpl.com/content/dam/fplgp/us/en/icons/air-blue-icon.png' alt='windspeed-icon' className='w-12 h-12 mt-4'/> <p className='mt-4 ml-4'>   {windSpeed ? `Windspeed : ${windSpeed}Km/h` : "Data N/A" }   </p> </div>
   </div>
  
     <div className='flex justify-center'>
      <div className="flex h-20 mr-4"> <img  src='https://img.genial.ly/5ea5b2dcd331670fb93482a4/6e94be44-eb70-4b50-b909-0eea88d93033.png' alt='rain-intensity-icon' className='w-8 h-8 mt-4'/>  <p className='mt-2 ml-2'> {rainIntensity ? `Rain Intensity : {rainIntensity}mm/h` :  "Data N/A" } </p> </div>
      {/* <div className="flex h-20"> <img  src='https://png.pngtree.com/png-vector/20220610/ourmid/pngtree-wave-icon-on-white-background-png-image_4831129.png' alt='wind-direction-icon' className='w-8 h-8 mt-4'/> <p className='mt-2 ml-2'> {windDirection ? `Wind Direction: {windDirection}` :  "Data N/A" }  </p> </div></div> */}

      <div className="flex h-20"> <img  src='https://png.pngtree.com/png-vector/20220917/ourmid/pngtree-icon-depicting-severe-rainfall-torrential-downpour-heavy-precipitation-vector-png-image_35563458.png' alt='rain-accumulation-icon' className='w-8 h-8 mt-4'/>  <p className='mt-2 ml-2'> {rainAccumulation ? `Rain Accumulation: {rainAccumulation}` : "Data N/A" } </p> </div>
   </div>
    </div>

    </div>
     
      
    </div>
  )
}

export default Info
