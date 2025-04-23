import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then(setPlants);
  }, []);

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleToggleSoldOut(id) {
    const updatedPlants = plants.map((plant) => 
    plant.id === id ? {...plant, isSoldOut: !plant.isSoldOut} : plant)
    setPlants(updatedPlants)
  }

  function handleUpdatePrice(id, newPrice) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ price: newPrice })
    })
      .then((res) => res.json())
      .then((updatedPlant) => {
        const updatedPlants = plants.map((plant) =>
          plant.id === updatedPlant.id ? updatedPlant : plant
        );
        setPlants(updatedPlants);
      });
  }
  
  function handleDeletePlant(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    }).then(() => {
      const updatedPlants = plants.filter((plant) => plant.id !== id);
      setPlants(updatedPlants);
    });
  }
  

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} onToggleSoldOut={handleToggleSoldOut} onUpdatePrice={handleUpdatePrice}
  onDeletePlant={handleDeletePlant} />
    </main>
  );
}

export default PlantPage;
