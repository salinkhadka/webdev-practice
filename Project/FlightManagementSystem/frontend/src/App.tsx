import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Main from './components/Main';
import Login from './components/Login';
import Signup from './components/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FlightAdd from './components/admin/flight/form';
import UnauthorizedPage from './components/unauthporizedpage';

function App() {

  const publicRoute =[ 
    {
      path: "", element: <Main />, children: [
        { path: "/home", element: <Home /> },
        
      ]
    },
    {
      path: "/Login", element: <Login />
    },
    {
      path: "/Signup", element: <Signup />
    }
    ,{
      path:"*",element:<UnauthorizedPage/>
    }

  ]


  const privateRoute=[
    {path:"/admin",element:<FlightAdd/>} 
  ]


  return (
    <>

      <RouterProvider router={createBrowserRouter(localStorage.getItem("userId")==0?privateRoute:publicRoute  )} 
      />

<ToastContainer />
    </>
  )
}

export default App
