import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ResetPassword.css'; // Import the CSS file

function ResetPassword() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));

  useEffect(() => {
    if (!userId) {
      toast.error("User ID not found in local storage");
    }
  }, [userId]);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!userId) {
      toast.error("User ID is not available");
      return;
    }

    try {
      // Fetch the user data by userId
      const res = await axios.get(`http://localhost:8080/user/get/${userId}`);
      const user = res.data;

      console.log("Fetched user data:", user); // Debugging line to inspect the user data

      // Prepare the updated user object based on UserPojo
      const updatedUser = {
        user_name: user.username || "", // Mapping to UserPojo field
        user_email: user.user_email || "", // Mapping to UserPojo field
        password: password, // Update the password
        contact_number: user.contact_number || "", // Mapping to UserPojo field
        user_address: user.user_address || "" // Mapping to UserPojo field
      };

      console.log("Updating user with:", updatedUser); // Debugging line to inspect the updated user object

      // Send the updated user object to the update endpoint
      await axios.put(`http://localhost:8080/user/update/${userId}`, updatedUser);

      toast.success("Password successfully reset");

      // Clear userId from local storage
      localStorage.removeItem('userId');

      // Redirect to /login after successful password reset
      window.location.href = "/login";
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="New Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-label="Confirm Password"
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
