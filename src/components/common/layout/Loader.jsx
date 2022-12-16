import React from 'react';
import { Circles  } from 'react-loader-spinner';

const Loader = ({ message }) => {
  return (
    <div className='loader'>
       <Circles 
        color="#FEA004" 
        height={50} 
        width={200} 
        className="m-5" 
        ariaLabel="circles-loading"
        />
     <p className='loader-message'>{message}</p>
    </div>
    
  )
}

export default Loader