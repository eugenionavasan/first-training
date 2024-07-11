import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import UserList from './UserList';
import UserForm from './UserForm';

function App() {
  const API_URL = 'http://localhost:3000/users';
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const response = await axios.get(API_URL);
    setUsers(response.data);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await axios.put(`${API_URL}/${editUserId}`, formData);
      fetchUsers();
      setIsEditing(false);
      setEditUserId(null);
    } else {
      const response = await axios.post(API_URL, formData);
      setUsers((prevUsers) => [...prevUsers, response.data]);
    }
    setFormData({ name: '', email: '', age: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, age: user.age });
    setIsEditing(true);
    setEditUserId(user.id);
  };

  return (
    <>
      <h1>Users</h1>
      <UserList users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
      <h1>{isEditing ? 'Edit User' : 'Create User'}</h1>
      <UserForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} isEditing={isEditing} />
    </>
  );
}

export default App;
