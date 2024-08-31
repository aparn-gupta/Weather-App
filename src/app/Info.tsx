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
    <div className='  '>
    <div className='flex justify-center'>
   <div>
   {temperature ? <p className=" text-7xl font-bold text-center ">{temperature}&deg;C </p> : <p className=" text-6xl font-bold text-center"> Data N/A </p>}
   <p className=" text-4xl font-bold text-center mt-4">  {place} </p>
   </div>
  
   


    </div>
   
  

    <div className=' w-full h-full pt-16 lg:pt-16 flex justify-center'>
   <div className = " w-full md:w-11/12 lg:w-4/5">
   <div className='flex justify-between w-full text-2xl'>
     <div className="flex h-20 mt-5">  <img  src=' https://cdn-icons-png.flaticon.com/512/1779/1779817.png ' alt='humidity-icon' className='w-9 h-9 '/> <p className='mt-1 lg:ml-2 md:ml-4 '> Humidity: <span className=' text-2xl md:text-4xl font-bold '>{ humidity ?  `${humidity}%` : "Data N/A"}</span> </p> </div>
   <div className="flex h-20"> <img  src='https://www.fpl.com/content/dam/fplgp/us/en/icons/air-blue-icon.png' alt='windspeed-icon' className='w-12 h-12 mt-4 '/> <p className='mt-6 lg:ml-2 md:ml-4 '> Wind Speed :  <span className='text-2xl md:text-4xl  font-bold' >{windSpeed ? `${windSpeed} Km/h` : "Data N/A"}</span>  </p> </div>
   </div>
  
     <div className='w-full flex justify-center pt-20 lg:pt-6'>

      <div className='w-11/12 lg:w-4/5 flex justify-between text-xl'>
      <div className="flex h-20"> <img  src='https://img.genial.ly/5ea5b2dcd331670fb93482a4/6e94be44-eb70-4b50-b909-0eea88d93033.png' alt='rain-intensity-icon' className='w-8 h-8 mt-4'/>  <p className='  mt-6 ml-2 '> Rain Intensity :  <span className=' font-bold 2xl '>{ rainIntensity ?  `${rainIntensity}mm/h` :  "Data N/A" }</span> </p> </div>

      <div className="flex h-20"> <img  src='https://png.pngtree.com/png-vector/20220917/ourmid/pngtree-icon-depicting-severe-rainfall-torrential-downpour-heavy-precipitation-vector-png-image_35563458.png' alt='rain-accumulation-icon' className='w-8 h-8 mt-4'/>  <p className='mt-6 ml-2 2xl'>  Rain Accumulation: <span className=' font-bold'>{rainAccumulation ? `${rainAccumulation}mm` : "Data N/A" }</span> </p> </div>
      </div>
     






   </div>
    </div>

    </div>
     
      
    </div>
  )
}

export default Info
