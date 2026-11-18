import ToyCard from './ToyCard';

// Renders one ToyCard per toy; the backend id is the unique key.
function ToyContainer({ toys, onDeleteToy, onUpdateToy }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onDeleteToy={onDeleteToy}
          onUpdateToy={onUpdateToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;