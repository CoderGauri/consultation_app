import React, { useState } from "react";
import "./App.css";

function App() {
  const [cName, setcName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [consultants , setConsultants] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editcName, setEditcName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCost , setEditCost] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ cName, description, cost });
    const newConsultant = {cName , description , cost};
    setConsultants ([...consultants , newConsultant]);

    setcName("");
    setDescription("");
    setCost("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditcName(consultants[index].cName);
    setEditDescription(consultants[index].description);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedConsultant = [...consultants];
    updatedConsultant[editIndex] = { cName: editcName, description: editDescription };
    setConsultants(updatedConsultant);
    setEditIndex(null);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditcName('');
    setEditDescription('');
  };


  const handleDelete = (index) => {
    const updatedConsultant = [...consultants];
    updatedConsultant.splice(index ,1);
    setConsultants(updatedConsultant);
  }

  return (
    <>
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
      <div className="consultant-list">
        <h2>Consultants</h2>
        <ul>
          {consultants.map((consultant, index) => (
            <li key={index}>
               {editIndex === index ? (
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label htmlFor="editcName">Edit  Name:</label>
                    <input
                      type="text"
                      id="editcName"
                      value={editcName}
                      onChange={(e) => setEditcName(e.target.value)}
                      required
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="editDescription">Edit Description:</label>
                    <textarea
                      id="editDescription"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      required
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="editCost">Edit Cost:</label>
                    <textarea
                      id="editCost"
                      value={editCost}
                      onChange={(e) => setEditCost(e.target.value)}
                      required
                    />
                     </div>
                     <button type="submit">Update</button>
                  <button type="button" onClick={handleCancelEdit}>Cancel</button>
                </form>
              ) : (

               <>
                  <h3>{consultant.cName}</h3>
                  <p>{consultant.description}</p>
                  <h2>{consultant.cost}</h2>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </>
            
          )}
          </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}

export default App;
