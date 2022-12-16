import React from 'react';
import { Link } from 'react-router-dom';

const ProductionItem = (props) => {
    
  return (
    <div className='production-item'>
        <h4>Department: {props?.department}</h4>
        <h4>Job: {props.job}</h4>
        <h4>For: {" "}
            <Link to={`/${props.media_type}/${props.id}`} className="link"> 
                {props.title || props.original_title || props.name || props.original_name}
            </Link>
        </h4>
    </div>
  )
}

export default ProductionItem