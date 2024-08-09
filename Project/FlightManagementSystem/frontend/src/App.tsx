import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Main from './components/Main';
import Signup from './components/Signup';
import FlightAdd from './components/admin/flight/form';
import UnauthorizedPage from './components/unauthporizedpage';
import DisplayFlights from './components/admin/flight/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/admin/Dashboard';
import DisplayFlightsUser from './components/admin/user/DisplayFlightsUser';
import PendingFlights from './components/admin/flight/PendingFlights';
import DisplayBookings from './components/admin/user/DisplayBookings';
import FlightRoute from './components/admin/user/FlightRoutes';







function App() {
  const isLoggedIn = localStorage.getItem("userId") === "0";

  console.log("User is logged in:", isLoggedIn);

  const publicRoutes = [
    {
      path: "/",
      element: <Main />,
      children: [
        { path: "/home", element: <Home /> },
        { path: "/book", element: <DisplayFlightsUser /> },
        { path: "/ticket-status", element: <DisplayBookings/> },
        { path: "/route-flight", element: <FlightRoute/> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "*", element: <UnauthorizedPage /> },
  ];

  const privateRoutes = [
    {
      path: "/admin",
      element: <Dashboard />, 
      children: [
        { path: "add-flight", element: <FlightAdd /> },
        { path: "view-flights", element: <DisplayFlights /> },
        { path: "pendingFlights", element: <PendingFlights/> },
        // Add more routes here as needed
        // { path: "view-users", element: <ViewUsers /> },
      ],
    },
    { path: "*", element: <UnauthorizedPage /> },
  ];

  const routes = isLoggedIn ? privateRoutes : publicRoutes;

  console.log("Routes being used:", routes);

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
