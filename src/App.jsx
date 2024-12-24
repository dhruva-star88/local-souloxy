import {Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider} from 'react-router-dom'
import React from 'react'
import MainLayout from './Layouts/MainLayout'
import NotFoundPage from './pages/NotFoundPage'
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import MessageArea from './pages/MessageArea'
import LearningHub from './pages/LearningHub'
import EditProfile from './pages/EditProfile'
import EditCalenderView from './pages/CalenderEditView'
import './index.css';


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element = {<MainLayout />}>
        <Route path ='/dashboard' element = {<Dashboard />}/>
        <Route path ='/appointments' element = {<Appointments />}/>
        <Route path ='/message-area' element = {<MessageArea />}/>
        <Route path ='/learning-hub' element = {<LearningHub />}/>
        <Route path ='/calendar' element = {<EditCalenderView />}/>
        <Route path ='/edit-profile' element = {<EditProfile />}/>
        <Route path ='*' element = {<NotFoundPage />}/>
      </Route>
    )
  )
  return (
    <RouterProvider router = {router} />
  )
}

export default App