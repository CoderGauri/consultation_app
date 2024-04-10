import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const [consultants, setConsultants] = useState([]);
  let id = 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name , skill); 
    id++
    
    
    setConsultants([...consultants , { name, skill , id}]);
    setName('');
    setSkill('');
  };
  return (
    <>
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Skill:
        <input type="text" value={skill} onChange={(e) => setSkill(e.target.value)} />
      </label>
      <button type="submit">Add Consultant</button>
    </form>


    </div>
    <div>
  
    {consultants.map((consultant, index) => (
            <div key={index}>
              <h3>{consultant.name}</h3>
              <p>{consultant.skill}</p>
             
            </div>
          ))}
  
</div>
    </>
  );
}

export default App;
