import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const[cost , setCost] = useState('');
  const [consultants, setConsultants] = useState([]);
  let id = 1;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://consultation-app-be.onrender.com/api/consultant');
      console.log(response.data)
      setConsultants(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name , skill , cost); 
    id++
    
    
    setConsultants([...consultants , { name, skill ,cost , id}]);
    setName('');
    setSkill('');
    setCost('');
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
      <label>
        Cost per hour:
        <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} />
      </label>
      <button type="submit">Add Consultant</button>
    </form>


    </div>
    <div>
  
    {consultants.map((consultant, index) => (
            <div key={index}>
              <h3>{consultant.name}</h3>
              <p>{consultant.skill}</p>
              <p>{consultant.cost}</p>
             
            </div>
          ))}
  
</div>
    </>
  );
}

export default App;
