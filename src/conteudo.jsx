import React, { useEffect, useState } from 'react';
import './conteudo.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('/paises.json').then(response => response.json()).then(data => {
        const formattedData = data.map(country => ({
          name: country.name,
          flag: country.flags.png,
          population: country.population,
          id: country.numericCode
        }));
        setCountries(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addToFavorites = (id) => {
    const countryToAdd = countries.find(country => country.id === id);
    setFavorites(prevFavorites => [...prevFavorites, countryToAdd]);
    setCountries(prevCountries => prevCountries.filter(country => country.id !== id));
  };

  const removeFromFavorites = (id) => {
    const countryToRemove = favorites.find(country => country.id === id);
    setFavorites(prevFavorites => prevFavorites.filter(country => country.id !== id));
    setCountries(prevCountries => [...prevCountries, countryToRemove]);
  };

  return (
    <div>
      <header>
        <div>
          <h2>Países</h2>
          <ul>
            {countries.map(country => (
              <li key={country.id}>
                <img src={country.flag} alt={`${country.name} flag`} width="50" />
                <p>Name: {country.name}</p>
                <p>Population: {country.population}</p>
                <button onClick={() => addToFavorites(country.id)}>Add aos favoritos</button>
              </li>
            ))}
          </ul>
        </div>
        <div className='espaco'>
          <h2>Favoritos</h2>
          <ul>
            {favorites.map(country =>(
              <li key={country.id}>
                <img src={country.flag} alt={`${country.name} flag`} width="50" />
                <p>Name: {country.name}</p>
                <p>Population: {country.population}</p>
                <button onClick={() => removeFromFavorites(country.id)}>Remover dos favoritos</button>
              </li>
            ))}
            </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
