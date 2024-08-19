import React from 'react';
import './stylesforsignup.css'; // Import the new CSS file
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const submit = (data: any) => {
        console.log(data);

        axios.post("http://localhost:8080/user/save", data)
            .then(res => {
                console.log(res);
                toast("Data saved successfully");
                navigate("/Login");
            })
            .catch(err => {
                console.error(err);
                toast.error("Error saving data");
            });
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group">
                        <label htmlFor="user_name">Name:</label>
                        <input
                            type="text"
                            id="user_name"
                            {...register("user_name")} // Matches the UserPojo field
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="user_email">Email:</label>
                        <input
                            type="email"
                            id="user_email"
                            {...register("user_email")} // Matches the UserPojo field
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")} // Matches the UserPojo field
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact_number">Contact Number:</label>
                        <input
                            type="text"
                            id="contact_number"
                            {...register("contact_number")} // Matches the UserPojo field
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="user_address">Address:</label>
                        <input
                            type="text"
                            id="user_address"
                            {...register("user_address")} // Matches the UserPojo field
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register("confirm_password")} // Not in UserPojo but for frontend validation
                            required
                        />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <div className="login-message">
                    <p>Already have an account?</p>
                    <a href="/Login"><button className="login-button">Login</button></a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
