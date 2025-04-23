import React, { useState } from "react";

function PlantCard({plant, onToggleSoldOut, onUpdatePrice, onDeletePlant}) {
  const [newPrice, setNewPrice] = useState(plant.price)

  function handlePriceChange(e) {
    setNewPrice(e.target.value);
  }

  function handlePriceSubmit(e) {
    e.preventDefault();
    onUpdatePrice(plant.id, newPrice);
  }
  return (
    <li className="card" data-testid="plant-item">
    <img src={plant.image} alt={plant.name} />
    <h4>{plant.name}</h4>
    <p>Price: {plant.price}</p>

    <form onSubmit={handlePriceSubmit}>
      <input
        type="number"
        step="0.01"
        value={newPrice}
        onChange={handlePriceChange}
      />
      <button type="submit">Update Price</button>
    </form>

    {plant.isSoldOut ? (
      <button onClick={() => onToggleSoldOut(plant.id)}>Out of Stock</button>
    ) : (
      <button className="primary" onClick={() => onToggleSoldOut(plant.id)}>
        In Stock
      </button>
    )}

    <button onClick={() => onDeletePlant(plant.id)}>Delete</button>
  </li>
);
}

export default PlantCard;
