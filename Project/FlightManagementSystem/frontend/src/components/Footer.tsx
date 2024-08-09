import React from 'react';
import './footer.css'; // Import the CSS file for Footer styles

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-container">
                    <div className="footer-section">
                        <h3>Flymandu Airlines</h3>
                        <p>Your gateway to the world.</p>
                        <ul className="social-links">
                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                            <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <p>Email: info@flymandu.com</p>
                        <p>Phone: +123-456-7890</p>
                        <p>Address: 123 Skyline Avenue, Flymandu City, Flyland</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Flymandu Airlines. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
