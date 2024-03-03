import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageArray from './Covers';


function App() {
  const [count, setCount] = useState(0)

function Clicked(){
  console.log("hello");
}
var url = window.location.href
  return (
    <>
      <div>

      <ImageArray />
      
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <a href="https://756d-2600-387-15-12-00-7.ngrok-free.app/login">Login with spotify <button onClick={Clicked}> Click
        </button></a>
      console.log(window.location.pathname);
      console.log(window.location.href);
      console.log('hi');
      </div>
      <p className="read-the-docs">
        Music nutrition label
      </p>
  
    </>
  );
};

export default App
