import Homepage from './components/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { log } from './log';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Yearbook from './components/Yearbook';
import './sass/main.scss';

function App() {
  log('<App /> rendered');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/yearbook' element={<Yearbook />} />
      </Routes>
    </Router>
  )
}

export default App