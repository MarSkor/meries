import React from 'react';
import { Link } from 'react-router-dom';
import NoImage from "../../assets/No-image.png";
import apiConfig from '../../api/apiConfig';
import { truncateString } from '../../utils/functions';

const ItemCardPerson = (props) => {

  return (
    <div className='card'>
        <Link to={`/person/${props.id}`} className="card-link">
            <div className="card__img-wrap">
                {/* if no poster path or backdrop path, use 'NoImage' */}
                <img 
                className='card-img' 
                src={props.profile_path ? apiConfig.w500Img(props.profile_path) : NoImage} 
                alt={props.name} />
            </div>

            <div className="card-body">
                <span className="card-body__title">
                    <h3>{truncateString(props.name, 25)}</h3>
                </span>
                <span className="card-body__about">
                    <h4>{props.known_for_department}</h4>
                </span>
            </div>
        </Link>
    </div>
  )
}

export default ItemCardPerson