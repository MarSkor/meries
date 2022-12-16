import React from 'react';
import { useParams } from 'react-router-dom';
import {  Loader, ErrorMessage, ItemCard, ItemCardPerson } from '../components';
import useSearch from '../hooks/useSearch';
import { OutlineButton } from '../components/common/button/Button';

const SearchResults = () => {
  const { query } = useParams();

  const { search, loading, error, loadMore } = useSearch(query)

  if(error){
    return <ErrorMessage message="An error occured"/>;
  }

  return (
    <div className="homepage-wrap page-wrap">
      <main>
       
        <section className="row">
          <h2>Search results for <strong>"{query}"</strong></h2>
          {search ? (
            <div className="list">
              {search.map((item, index) => (
                <div key={index}>
                {item.media_type === "movie" && <ItemCard key={item.id} {...item} media_type={item.media_type}/> }
                {item.media_type === "tv" && <ItemCard key={item.id} {...item} media_type={item.media_type}/> }
                {item.media_type === "person" && <ItemCardPerson key={item.id} {...item}/> }
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <div className="btn-wrap">
          <OutlineButton 
          title="load more movies" 
          className="load-more" 
          onClick={loadMore}>
          {loading ? 'Loading...' : 'Load More'}
          </OutlineButton>
        </div> 

      </main>
    </div>
  )
}

export default SearchResults