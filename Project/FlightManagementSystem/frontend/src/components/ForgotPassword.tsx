import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ForgotPassword.css'; // Import the CSS file

function ForgotPassword() {
  const [username, setUsername] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const navigate = useNavigate(); // Initialize navigate

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      // Log userId and username for debugging
      console.log(`Attempting to verify user with ID: ${userId} and Username: ${username}`);

      // Update API endpoint to fetch user by ID
      const res = await axios.get(`http://localhost:8080/user/get/${userId}`);
      const user = res.data;

      // Log user data for debugging
      console.log("Fetched user data:", user);

      // Check if the username matches the userId
      if (user && user.username === username) {
        toast.success("User found! You can now reset your password.");

        // Store userId in local storage
        localStorage.setItem('userId', userId);

        // Navigate to the reset password page
        navigate('/resetpassword');
      } else {
        toast.error("User not found or username does not match the user ID.");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      toast.error("Error verifying user. Please check the console for details.");
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-label="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              aria-label="User ID"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify User'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
