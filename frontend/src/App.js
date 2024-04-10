import logo from './logo.svg';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name , skill);
    addConsultant({ name, skill });
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
    </>
  );
}

export default App;
