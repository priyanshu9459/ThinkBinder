import './App.css';
import Home from './Component/Home';
import About from './Component/About';
import Navbar from './Component/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './componentcss/Navbar.css';
import NoteState from './Context/Notes/noteState';
import Alert from './Component/Alert';
import React, {useState} from 'react';
import Topics from './Component/Topics';
import Recharts from './Topic/recharts';
import Login from './Component/Login';
import Signup from './Component/Signup'
function App() {
  const [alert, setAlert] = useState(false);
  const [state, setState] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <div className="App">
    
     <Router>
     <Navbar></Navbar><Alert alert={alert} />
     <Routes>
     <Route   path="/" element={<NoteState showAlert={showAlert} ><Home setAlert={setAlert} showAlert={showAlert}/></NoteState>} />
     <Route   path="/home" element={<NoteState showAlert={showAlert} ><Home setAlert={setAlert} showAlert={showAlert}/></NoteState>} />
      <Route exact path="/about" element={ <NoteState><About></About></NoteState>} />
      <Route exact path="/topics/*" element={<Topics></Topics>}/>
      <Route exact path="/recharts/*" element={<Recharts></Recharts>}/>
      <Route exact path="/login" element={<Login showAlert={showAlert} ></Login>}/>
      <Route exact path="/signup"  element={<Signup showAlert={showAlert}></Signup>}/>
      </Routes>
     
      
    </Router>
    </div>
  );
}

export default App;
