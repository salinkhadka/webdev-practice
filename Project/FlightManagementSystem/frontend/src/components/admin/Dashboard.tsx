import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './dashboard.css';
import Navbar from './adminNavbar';
import Footer from './adminFooter';

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <aside className="sidebar">
          <div className="logo">FlightMandu</div>
          <nav>
            <ul>
              <li><Link to="/admin/add-flight">Add Flight</Link></li>
              <li><Link to="/admin/view-flights">View List of Flights</Link></li>
              <li><Link to="/admin/view-users">View List of Users</Link></li>
              <li><Link to="/admin/pendingFlights">Pending Flights</Link></li> 
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
