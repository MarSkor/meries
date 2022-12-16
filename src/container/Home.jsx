import React from 'react';
import { ItemCard, Loader } from '../components';
import useTrending from '../hooks/useTrending';

const Home = () => {

  const { trending, loading, error } = useTrending();


  if(loading){
    return <Loader/>
  }

  if(error){
    return "An error occured."
  }


  return (
   <div className="homepage-wrap page-wrap">
    <main>
      <div className="header">
        <h1>Browse Movies & TV shows with m<span className='color-brand'>eries.</span></h1>
        <p>Always something to watch.</p>
      </div>
  
    

      <div className="list-wrap">
        <section className='trending-movie row'>
          <div className="view-more">
            <h2>Trending Movies</h2>
          </div>
          {trending.movies ? (
            <div className='list'>
              {trending.movies && trending.movies.map(movie => <ItemCard key={movie.id} {...movie} media={movie.media_type} />)}
            </div>
          ) : null }
        </section>

        <section className='trending-tv row'>
          <h2 id="trendingTv">Trending TV</h2>
          {trending.tv ? (
            <div className='list'>
              {trending.tv && trending.tv.map(serie => <ItemCard key={serie.id} {...serie} media={serie.media_type} />)}
            </div>
          ) : null }
        </section>
      </div>
    </main>
   </div>
  )
}

export default Home