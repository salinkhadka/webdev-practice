import React, { useEffect, useState } from 'react';
import './home.css'; // Import the CSS file
import bg from '../assets/d2.avif';
import axios from 'axios';

const Home: React.FC = () => {
    const [userName, setUserName] = useState<string>('Guest');

    useEffect(() => {
        const fetchUserName = async () => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:8080/user/get/${userId}`);
                    const user = response.data;
                    if (user && user.username) {
                        setUserName(user.username);
                        localStorage.setItem("userName", user.username); // Store the username in localStorage
                    }
                } catch (error) {
                    console.error("There was an error fetching the user details:", error);
                }
            }
        };

        fetchUserName();
    }, []);

    return (
        <div className="main-cont">
            <div className="main-char">
                <div className="image">
                    <img src={bg} alt="Background" />
                    <div className="welcome-message">Welcome {userName}. Where would you like to fly?</div>
                    <div className="Book"><a href="book">Book</a></div>
                </div>
            </div>

            <section className="info-section">
                <h2>About Us</h2>
                <p>We provide the best flight routes and booking experience. Explore the world with us!</p>
            </section>
            <section className="services-section">
                <h2>Our Services</h2>
                <ul>
                    <li>Easy Online Booking</li>
                    <li>24/7 Customer Support</li>
                    <li>Best Price Guarantee</li>
                    <li>Secure Payments</li>
                </ul>
            </section>
        </div>
    );
}

export default Home;
