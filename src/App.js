import React from 'react';
import { Collection } from './Collection';
import './index.scss';

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  
  React.useEffect(() => {
  //setIsLoading(true)
  fetch('https://64d8d5725f9bf5b879ce9a1d.mockapi.io/collection_photos')
  .then((res) => res.json())
  .then((json) => {
    setCollections(json);
  })
  .catch((err) => {
    console.warn(err);
    alert('Error');
  })
  //.finally( setIsLoading(false));
  },[]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          <li className="active">Все</li>
          <li>Горы</li>
          <li>Море</li>
          <li>Архитектура</li>
          <li>Города</li>
        </ul>
        <input value={searchValue} 
        onChange={(e) => setSearchValue(e.target.value)} 
        className="search-input" 
        placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {collections.filter((obj) =>  obj.name.toLowerCase()
          .includes(searchValue.toLowerCase()))
          .map((obj, index) => (
        <Collection
        key={index}
          name={obj.name}
          images={obj.photos}
        />
        ))};
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
