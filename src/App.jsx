
import './pages/App.css'
import ImageArray from './pages/Covers';
import { Route, Routes, Navigate} from 'react-router-dom';
import Login from "./pages/Login";
import Results from "./pages/Results";

function App() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/results" element={<Results />}/>
          <Route path="*" element={<Navigate to="/" replace  />}/>
        </Routes>
  
      </div>
    )
    }

export default App;