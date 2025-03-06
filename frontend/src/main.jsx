import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import CreateForm from './pages/CreateForm.jsx'
import PreviewPage from './pages/PreviewPage.jsx'
import DashBoard from './pages/DashBoard.jsx'
import Successfull from './pages/Successfull.jsx'
import UserResponsesPage from './pages/UserResponsesPage.jsx'
import SucessfullDeleted from './pages/SucessfullDeleted.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/create-form',
    element: <CreateForm />,
  },
  {
    path: '/preview',
    element: <PreviewPage />,
  },
  {
    path: '/response/:userId/:formId',
    element: <PreviewPage />,
  },
  {
    path : '/dashboard',
    element : <DashBoard />
  },
  {
    path : '/reponse/subitted',
    element : <Successfull />
  },
  {
    path : '/form/:formId/responses',
    element : <UserResponsesPage />
  },
  {
    path : '/form/successfull-deleted',
    element : <SucessfullDeleted />
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
