import { useState, useEffect } from 'react';
import Header from './Header';
import ToyForm from './ToyForm';
import ToyContainer from './ToyContainer';
import { API_URL } from '../api';

function App() {
  // Whether the "create a toy" form is visible.
  const [showForm, setShowForm] = useState(false);
  // Every toy from the backend. It lives here because both ToyForm
  // (adds) and ToyContainer/ToyCard (likes, deletes) need to change it.
  const [toys, setToys] = useState([]);

  // Fetch all toys once, when the app first renders.
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error('Could not load toys:', err));
  }, []);

  function handleClick() {
    setShowForm((show) => !show);
  }

  // Append the toy the backend just created (it already has an id).
  function handleAddToy(newToy) {
    setToys((prevToys) => [...prevToys, newToy]);
  }

  // Drop the donated toy from state.
  function handleDeleteToy(id) {
    setToys((prevToys) => prevToys.filter((toy) => toy.id !== id));
  }

  // Swap the updated toy in place with map(), so the toy order never changes.
  function handleUpdateToy(updatedToy) {
    setToys((prevToys) =>
      prevToys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;