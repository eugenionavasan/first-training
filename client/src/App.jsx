import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  let [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });
 
  useEffect(()=> {
    fetchUsers()
  }, []);
  
  async function fetchUsers() {
    const response = await axios.get('http://localhost:3000/users');
    setUsers(response.data);
    //  console.log(users)
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await axios.post('http://localhost:3000/users', formData);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setFormData({ name: '', email: '', age: '' }); 
  };

  return (

    <>
      <h1>Users</h1>
      <div className='show-users'>
        {users.map(user => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <h2>{user.age}</h2>
          </div>
        ))}
      </div>
      <h1>Create User</h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            min="0"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <button type="submit">Add User</button>
        </form>
      </div>
    </>
  )
}

export default App
