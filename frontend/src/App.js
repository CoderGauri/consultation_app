import React, { useState } from "react";
import "./App.css";

function App() {
  const [cName, setcName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ cName, description, cost });

    setcName("");
    setDescription("");
    setCost("");
  };

  return (
    <div className="App">
      <h1>Healing Together</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cName">Consultant Name:</label>
          <input
            type="text"
            id="cName"
            value={cName}
            onChange={(e) => setcName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cost">Cost:</label>
          <textarea
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
