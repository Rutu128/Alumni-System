import Homepage from './components/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { log } from './log';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Yearbook from './components/Yearbook';
import './sass/main.scss';
import UserContextProvider from './context/UserContext';
import TestPage from './components/Homepage UI/TestPage';
import LandingPage from './components/LandingPage';
import HomepageContent from './components/Homepage UI/HomepageContent';

function App() {
  log('<App /> rendered');

  return (
    <UserContextProvider>
      <Router>
        <Routes>
          {/* <Route path='/' element={<LandingPage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/yearbook' element={<Yearbook />} />
          <Route path="/" element={<Homepage />}>
            <Route path='/' index element={<HomepageContent />} />
            <Route path='/testPage' element={<TestPage />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  )
}

export default App