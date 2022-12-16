import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import apiConfig from '../../../api/apiConfig';
import NoImage from "../../../assets/No-image.png"
import axios from 'axios';

const Search = ({ placeholder }) => {
    const [query, setQuery] = useState("");
    const [searchItems, setSearchItems] = useState([]);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
      if (searchItems.length) {
        navigate({pathname: `/search/${query}`});
      } else {
        setError({isError: true});
      }
    }

    const handleChange = async(e) => {
      e.preventDefault();
      setQuery(e.target.value)
      try{
        axios.get(`${apiConfig.baseUrl}search/multi?api_key=${apiConfig.apiKey}&page=1&language=en-US&query=${query}`)
        .then((res) => {
          if(res.status === 200){
            setSearchItems(res.data.results)
          }
        })
      } catch(e) {
        console.log(e)
       if(e.response.status === 422){
        setError(e)
       }
      }
    }

    const clearInput = () => {
      setQuery("");
      setSearchItems([]);
    }

    console.log("searchitems", searchItems)

  return (
    <>
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <input 
        className="input-field" 
        type="text" 
        name='query'
        value={query}
        placeholder={placeholder}
        onChange={handleChange}
        error={error.isError}
        />

        {searchItems.length === 0 ? (
          <button type='button' className='btn-icon'>
            <CiSearch className='search-icon'/>
          </button>
        ) : (
          <button type='button' className='btn-icon' onClick={clearInput} id="clearBtn">
            <AiOutlineClose className='clear-icon'/>
          </button>
        )}
      </form>

      {/* {searchItems.length > 0 ? ( */}
        <ul className="searchlist">
          {searchItems.slice(0,12).map((item, i) => (
          <div className="list-bg" key={i}>
            <Link to={item ? (`/${item.media_type}/${item.id}`) : (`/person/${item.id}`)} className="card-link" key={item.id}>
              <li>
                <img 
                className='media-sm-img' 
                src={item?.profile_path || item?.poster_path ? (apiConfig.w500Img(item.poster_path || item.profile_path)) : NoImage } 
                alt={item.name || item.title || item.original_name || item.original_title} 
                />
                <div className='search-info'>
                  <h5>{item.name || item.title || item.original_name || item.original_title}</h5>
                  <p>{item.media_type}</p>
                </div>
              </li>
            </Link>
            
          </div>
          ))}
          {searchItems.length > 0 ? (
              <div className='view-more'>
                <Link className='link-light' to={`/search/${query}`}>View all results for "{query}"</Link>
              </div>
            ) : ""}
          {error ? <p>{error}</p> : ""}
        </ul>
      {/* // ) : (
      //   <ul className="searchlist">
      //     <p>No Items</p>
      //   </ul> */}
      {/* // )} */}
    </div>
    </>
  )
}

export default Search