import React from 'react'
import { useState } from 'react';
import Search from './components/Search';

const App = () => {
const [searchTerm, setSearchTerm] = useState('');
  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="../public/hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className='text-gradient'>Moveies</span> You'll Enjoy Without the Hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
    </main>
  ); 
}

export default App