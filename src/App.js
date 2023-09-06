import React from 'react';
import { Collection } from './Collection';
import './index.scss';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  
  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://64d8d5725f9bf5b879ce9a1d.mockapi.io/collection_photos?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Error');
      })
      .finally(() => setIsLoading(false));
  },[categoryId, page]);

  const handlePage = (i) => {
    setPage(i + 1)
  }

  const handleSearch = (event) => {
    setSearchValue(event.target.value)
  }

  const handleCategory = (i) => {
    setCategoryId(i)
  }

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>

      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (
            <li
              onClick={handleCategory} 
              className={categoryId === i ? 'active' : ''} 
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>

        <input
          value={searchValue} 
          onChange={handleSearch} 
          className="search-input" 
          placeholder="Поиск по названию"
        />
      </div>

      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collections
            .filter((obj) => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase())
            })
            .map((obj, index) => (
              <Collection
                key={index}
                name={obj.name}
                images={obj.photos}
              />
            ))
        )}
      </div>

      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li
            onClick={handlePage}
            className={page === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;