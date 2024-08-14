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
import PostContextProvider from './context/PostContext';
import Profile from './components/Pages/Profile';
import GlobalContextProvider from './context/GlobalContext';
import Search from './components/Pages/Search';

function App() {
  log('<App /> rendered');

  return (
    <GlobalContextProvider>
      <UserContextProvider>
        <PostContextProvider>
          <Router>
            <Routes>
              {/* <Route path='/' element={<LandingPage />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/yearbook' element={<Yearbook />} />
              <Route path="/" element={<Homepage />}>
                <Route path='/' index element={<HomepageContent />} />
                <Route path='/testPage' element={<TestPage />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/search' element={<Search />} />
              </Route>
            </Routes>
          </Router>
        </PostContextProvider>
      </UserContextProvider>
    </GlobalContextProvider>
  )
}

export default App