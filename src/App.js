import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setInvates] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json => setUsers(json.data))
      .catch(err => {
        console.log(err);
        alert(`Error: ${err.message}`)
      })
      .finally(() => setLoading(false))
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
   };

  const handleClickInite = (id) => {
    if (invites.includes(id)) {
      setInvates(prev => prev.filter(_id => _id !== id))
    } else {
      setInvates(prev => [...prev, id])
    }
  };

  const handleClickSendInvites = () => {
    setSuccess(true);
  }

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          users={users}
          isLoading={isLoading}
          invites={invites}
          onClickInite={handleClickInite}
          onClickSendInvites={handleClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
