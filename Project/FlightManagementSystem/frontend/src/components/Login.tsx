import React, { useEffect, useState } from 'react';
import './stylesforlogin.css'; // Import the CSS file
import axios from 'axios';
import { toast } from 'react-toastify';

const Login: React.FC = () => {

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            window.location.href = "/home";
        }
    }, []);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email, password);

        const payload = { username: email, password: password };
        
        axios.post("http://localhost:8080/user/login", payload).then(res => {
            console.log(res);
            const userId = res?.data;

            if (userId === 0) {
                localStorage.setItem("userId", userId);
                window.location.href = "/admin";
            } else if (userId) {
                localStorage.setItem("userId", userId);
                window.location.href = "/home";
            } else {
                toast("Login failed");
            }
        }).catch(error => {
            console.error("There was an error with the login request:", error);
            toast("Login failed");
        });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label="Email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-label="Password"
                        />
                    </div>
                    <div className="forgot-password">
                        <a href="/ForgotPassword">Forgot Password?</a>
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="signup-message">
                    <p>Don't have an account?</p>
                    <a href="/Signup"><button className="signup-button">
                        Sign Up
                    </button></a>
                </div>
            </div>
        </div>
    );
};

export default Login;
