import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Register from './screens/Register';
import First from './screens/First';
import Login from './screens/Login';
import Main from './screens/Main';
import Shome from './screens/sell/Shome';
import Slogin from './screens/sell/Slogin';
import Sregister from './screens/sell/Sregister';
import Home from './screens/Home';

function App() {
  return (
  <Router>
    <Routes>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/" element={<First/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/main" element={<Main/>}/>
      <Route exact path="/shome" element={<Shome/>}/>
      <Route exact path="/slogin" element={<Slogin/>}/>
      <Route exact path="/sregister" element={<Sregister/>}/>
      <Route exact path="/buy" element={<Home/>}/>
    </Routes>
  </Router>
  
  
  
  
  
  
  
  )
    
}

export default App;
