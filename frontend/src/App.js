import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [skills, setSkill] = useState('');
  const[cost , setCost] = useState('');
  const [consultants, setConsultants] = useState([]);
  let id = 1;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://consultation-app-be.onrender.com/api/consultants');
      console.log(response.data)
      setConsultants(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name , skills , cost); 
    id++
    
    
    setConsultants([...consultants , { name, skills ,cost , id}]);
    setName('');
    setSkill('');
    setCost('');
  };

  const handleDelete = (index) => {
    const updatedPosts = [...consultants];
    updatedPosts.splice(index, 1);
    setConsultants(updatedPosts);
  };
  return (
    <>
    <div>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}required />
      </label>
      <label>
        Skill:
        <input type="text" value={skills} onChange={(e) => setSkill(e.target.value)}required />
      </label>
      <label>
        Cost per hour:
        <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} required/>
      </label>
      <button type="submit">Add Consultant</button>
      </div>
    </form>


    </div>
    <div>
  
    {consultants.map((consultants, index) => (
            <div key={index}>
              <h3>{consultants.name}</h3>
              <p>{consultants.skills}</p>
              <p>{consultants.cost}</p>
              <button onClick={() => handleDelete(index)}>Delete</button>
             
            </div>
          ))}
  
</div>
    </>
  );
}

export default App;
