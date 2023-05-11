import React ,{useState} from 'react'
import './App.css'
import SignUpPage from './pages/signuppage.jsx';
import Home from './pages/home.jsx';
import { BrowserRouter  , Routes , Route , Navigate} from 'react-router-dom';
import ViewFiles from './pages/viewFilespage';
import Dashboard from './pages/dashboard';
import CreateFile from './pages/createFile';
import MyFiles from './pages/myfiles';
import WelcomePage from './pages/welcomepage';
import LoginPage from './pages/loginpage'
import PageNotFound from './pages/pageNotFound';
import Profile from './pages/profile';


function App() {
  const empId = localStorage.getItem('empId');
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element = {<PageNotFound />} />
        <Route path ="/profile" element = {<Profile />} />
        <Route path="/" element={empId ? <Home /> :<WelcomePage />} />
        <Route path="/signUp" element={<SignUpPage />}  />
        <Route path="/login" element={<LoginPage />}  />
        <Route path='/home' element={<Home />}>
          <Route path='dashboard'  >
            <Route path=':department' element={<Dashboard />}  >
              <Route path=':pageData' element={<ViewFiles />} />
            </Route>
          </Route>
          <Route path='createFile' element={<CreateFile />} />
          <Route path="myfiles" element={<MyFiles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
