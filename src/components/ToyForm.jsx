import { useState } from 'react';
import { API_URL } from '../api';

const EMPTY_FORM = { name: '', image: '' };

function ToyForm({ onAddToy }) {
  // Controlled form: React state is the single source of truth for the inputs.
  const [formData, setFormData] = useState(EMPTY_FORM);

  // Each input's `name` attribute matches a key in formData.
  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Save the toy first (new toys start with 0 likes),
    // then add the saved record to the page.
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        image: formData.image,
        likes: 0,
      }),
    })
      .then((res) => res.json())
      .then((newToy) => {
        onAddToy(newToy);
        setFormData(EMPTY_FORM); // clear the form for the next toy
      })
      .catch((err) => console.error('Could not add toy:', err));
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input type="text" name="name" placeholder="Enter a toy's name..."
          className="input-text" value={formData.name} onChange={handleChange} />
        <br />
        <input type="text" name="image" placeholder="Enter a toy's image URL..."
          className="input-text" value={formData.image} onChange={handleChange} />
        <br />
        <input type="submit" name="submit" value="Create New Toy" className="submit" />
      </form>
    </div>
  );
}

export default ToyForm;