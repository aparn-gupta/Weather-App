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
   {temperature ? <p className=" text-5xl  md:text-7xl font-bold text-center ">{temperature}&deg;C </p> : <p className="  text-5xl  md:text-7xl font-bold text-center"> Data N/A </p>}
   <p className=" text-2xl md:text-4xl font-bold text-center mt-2 md:mt-4">  {place} </p>
   </div>
  
   


    </div>
   
  

    <div className=' w-full h-full  md:pt-16 lg:pt-16 flex justify-center '>
   <div className = " w-full md:w-11/12 lg:w-4/5">
   <div className='flex justify-between w-full text-lg md:text-2xl'>
     <div className="flex h-20 mt-5">  <img  src=' https://cdn-icons-png.flaticon.com/512/219/219816.png ' alt='humidity-icon' className=' w-6 h-6  md:w-10 md:h-10 '/> <p className='mt-1 ml-2 lg:ml-2 md:ml-4 '> Humidity: <span className=' text-2xl md:text-4xl font-bold '>{ humidity ?  `${humidity}%` : "Data N/A"}</span> </p> </div>
   <div className="flex h-20"> <img  src='https://www.dhm.gov.np/assets/frontend/assets/images/warning/Wind.png' alt='windspeed-icon' className='w-6 h-6  md:w-12 md:h-12 mt-5 '/> <p className='mt-6 ml-2 lg:ml-2 md:ml-4 '> Wind Speed:  <span className='text-2xl md:text-4xl  font-bold' >{windSpeed ? `${windSpeed} Km/h` : "Data N/A"}</span>  </p> </div>
   </div>
  
     <div className='w-full flex justify-center pt-2 md:pt-20 lg:pt-6'>

      <div className='w-11/12 lg:w-4/5 md:flex md:justify-between text-base md:text-xl'>
      <div className="flex h-10 md:h-20"> <img  src='https://cdn-icons-png.flaticon.com/512/1229/1229469.png' alt='rain-intensity-icon' className='w-8 h-8 mt-4'/>  <p className=' text-base mt-6 ml-2 '> Rain Intensity:  <span className=' font-bold text-xl '>{ rainIntensity ?  `${rainIntensity}mm/h` :  "Data N/A" }</span> </p> </div>

      <div className="flex h-10 md:h-20"> <img  src='https://creazilla-store.fra1.digitaloceanspaces.com/icons/3230466/accumulation-rain-icon-md.png' alt='rain-accumulation-icon' className='w-8 h-8 mt-4'/>  <p className='mt-6 ml-2 text-base'>  Rain Accumulation: <span className=' font-bold'>{rainAccumulation ? `${rainAccumulation}mm` : "Data N/A" }</span> </p> </div>
      </div>
     






   </div>
    </div>

    </div>
     
      
    </div>
  )
}

export default Info
