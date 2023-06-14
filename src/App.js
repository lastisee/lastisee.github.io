import './App.css';
import { useState } from 'react';
import {Link} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(1)
  return (
    <div className="App">
      <div style={{margin: '80px auto',width: '200px', fontSize: '24px'}}>
        lastisee's website
      </div>
      <div style={{margin: '80px auto',width: '200px', fontSize: '24px'}}>
        <span style={{margin: '12px'}}>count: {count}</span>
        <button onClick={()=> setCount(prev => prev - 1)} style={{marginRight: '12px'}}>-</button>
        <button onClick={()=> setCount(prev => prev + 1)}>+</button>
      </div>
      <Link to='/test'>goto test page</Link>

    </div>
  );
}

export default App;
