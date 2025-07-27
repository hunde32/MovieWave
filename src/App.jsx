import React from 'react'
import { useState, useEffect } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTION = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}


const App = () => {
const [searchTerm, setSearchTerm] = useState('');
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

  const fetchMovies = async (query = '') => {
    setLoading(true);
    setError('');
    try{
      const endpoint = query
      ?  `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&sort_by=popularity.desc`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTION);
     if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if(data.Response === 'False') {
        throw new Error(data.Error || 'An error occurred while fetching movies');
        setMovies([]);
        return;
      }
      setMovies(data.results || []);
    }catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to fetch movies. Please try again later.');
    }finally{
      setLoading(false);
    }
  }
useEffect(() => {
  fetchMovies(searchTerm)
},[searchTerm]);

  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="../public/hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Moveies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className='all-movies'>
          <h2>All Movies</h2>
            {loading ? (
              <Spinner/>
            ) : error ? (
              <p className='text-red-500'>{error}</p>
            ) : (
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )}
           </section>
      </div>
    </main>
  ); 
}

export default App