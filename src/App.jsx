import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Layout, Details, PersonDetailsCard } from "./components";
import { Home, Movies, Tv, SearchResults, People } from "./container";
import "./styles/main.scss"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/tvshows' element={<Tv/>} />
        <Route path='/movies' element={<Movies/>} />
        
        <Route path='/people' element={<People />} />
        <Route path='/person/:id' element={<PersonDetailsCard />} />

        <Route path='/:media/:id' element={<Details />} exact/>
        <Route path='/*' element={<Home/>}/>

        <Route path="/search/:query" exact element={<SearchResults />}/>
      </Routes>
    </Layout>
  )
}

export default App
