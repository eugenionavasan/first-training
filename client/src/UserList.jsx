/* eslint-disable react/prop-types */
function UserList({ users, handleEdit, handleDelete }) {
  return (
    <div className='show-users'>
      {users.map(user => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
          <h2>{user.age}</h2>
          <button onClick={() => handleEdit(user)}>Edit</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default UserList;