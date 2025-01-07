import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { log } from './log';
import Login from './pages/Login';
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MultiStepSignUp from './pages/MultiStepSignUp';
import SignUpContextProvider from './context/SignUpContext';
import EditProfile from './components/Edit/EditProfile';
import Notifications from './components/Pages/Notifications';
import JobPostings from './pages/JobPostings';
import JobDetails from './components/Pages/Jobs/JobDetails';
import CreateJobPost from './components/Pages/Jobs/CreateJobPost';
import DisplayJobs from './components/Pages/Jobs/DisplayJobs';
import MyJobPosts from './components/Pages/Jobs/MyJobPosts';

function App() {
  log('<App /> rendered');
  const location = useLocation();
  const background = location.state && location.state.background;
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SignUpContextProvider>
        <GlobalContextProvider>
          <UserContextProvider>
            <PostContextProvider>
              <Routes location={background || location}>
                <Route path="/login" element={<Login />} />
                <Route path='/signup' element={<MultiStepSignUp />} />
                <Route path='/yearbook' element={<Yearbook />} />
                <Route path="/" element={<Homepage />}>
                  <Route path='/' index element={<HomepageContent />} />
                  <Route path='/testPage' element={<TestPage />} />
                  <Route path='/users/:username' element={<Profile />} />
                  <Route path='/search' element={<Search />} />
                  <Route path='/jobs'  element={<JobPostings />} >
                    <Route path='/jobs' element={<DisplayJobs />} />
                    <Route path='/jobs/:id' element={<JobDetails />} />
                    <Route path='/jobs/new' element={<CreateJobPost />} />
                    <Route path='/jobs/myPosts' element={<MyJobPosts />} />
                  </Route>
                  <Route path='/notifications' element={<Notifications />} />
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/profile'>
                    <Route path='/profile' element={<UserProfile />} />
                    <Route path='/profile/edit' element={<EditProfile />} />
                  </Route>
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
      </SignUpContextProvider>
    </QueryClientProvider>
  )
}

export default App