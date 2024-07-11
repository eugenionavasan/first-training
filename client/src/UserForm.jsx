/* eslint-disable react/prop-types */
function UserForm({ formData, handleChange, handleSubmit, isEditing }) {
  return (
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
        <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
}

export default UserForm;