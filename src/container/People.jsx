import React from 'react';
import usePerson from '../hooks/usePeople';
import { ErrorMessage, ItemCard, Loader, ItemCardPerson } from '../components';
import { Button } from '../components';

const People = () => {

  const { person, loading, error, loadMore } = usePerson();

  if(loading){
    return <Loader/>
  }

  if(error){
    return <ErrorMessage message="An error occured"/>;
  }

  return (
    <div className="homepage-wrap page-wrap">
      <main>
        <section className="row">
          <h2>Popular People</h2>
            {person ? (
              <div className='list'>
                {person.map(p => <ItemCardPerson key={p.id} {...p}/>)}
              </div>
            ) : null }
        </section>

        <div className="btn-wrap">
          <Button 
          title="load more movies"  
          onClick={loadMore}>
          {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
        
      </main>
    </div>
  )
}

export default People