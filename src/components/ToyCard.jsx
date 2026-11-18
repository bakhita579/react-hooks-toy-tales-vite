import { API_URL } from '../api';

function ToyCard({ toy, onDeleteToy, onUpdateToy }) {
  const { id, name, image, likes } = toy;

  // Step 5: PATCH the new like count, then replace this toy in App's state
  // with the updated record the backend sends back.
  function handleLike() {
    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => onUpdateToy(updatedToy))
      .catch((err) => console.error('Could not like toy:', err));
  }

  // Step 4: DELETE the toy on the backend, then remove it from the page.
  function handleDonate() {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => onDeleteToy(id))
      .catch((err) => console.error('Could not donate toy:', err));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>Like {'<3'}</button>
      <button className="del-btn" onClick={handleDonate}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;