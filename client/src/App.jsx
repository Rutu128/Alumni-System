import Homepage from './components/Homepage';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import UserProfile from './components/Pages/UserProfile';
import Profile from './components/Pages/Profile';
import GlobalContextProvider from './context/GlobalContext';
import Search from './components/Pages/Search';
import Settings from './components/Pages/Settings';
import ExpandedPostModal from './components/Modal UI/ExpandedPostModal';

function App() {
  log('<App /> rendered');
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <GlobalContextProvider>
      <UserContextProvider>
        <PostContextProvider>
            <Routes location={background || location}>
              <Route path="/login" element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/yearbook' element={<Yearbook />} />
              <Route path="/" element={<Homepage />}>
                <Route path='/' index element={<HomepageContent />} />
                <Route path='/testPage' element={<TestPage />} />
                <Route path='/users/:username' element={<Profile />} />
                <Route path='/search' element={<Search />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/profile' element={<UserProfile />} />
                <Route path='/post/:id' element={<ExpandedPostModal isModal={false} />} />
              </Route>
            </Routes>
            {background && (
              <Routes>
                <Route path="/post/:id" element={<ExpandedPostModal isModal={true} />} />
              </Routes>
            )}
        </PostContextProvider>
      </UserContextProvider>
    </GlobalContextProvider>
  )
}

export default App