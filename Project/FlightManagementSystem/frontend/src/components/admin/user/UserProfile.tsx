import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './UserProfile.css'; // Import the CSS file

interface FormData {
    id: number;
    user_name: string;
    user_email: string;
    password: string;
    contact_number: string;
    user_address: string;
}

const SubscriptionForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        id: 0,
        user_name: '',
        user_email: '',
        password: '',
        contact_number: '',
        user_address: ''
    });

    const fetchUserData = async (id: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/user/get/${id}`);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const userData = response.data;
            setFormData({
                id: userData.id,
                user_name: userData.username, // Correctly map "username" to "user_name"
                user_email: userData.user_email,
                password: userData.password,
                contact_number: userData.contact_number,
                user_address: userData.user_address
            });
        } catch (error) {
            toast.error('Error fetching user data');
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
        if (userId) {
            fetchUserData(Number(userId)); // Convert userId to a number
        } else {
            toast.error('User ID not found in local storage');
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (userId) {
            // Create a payload to send to the backend, matching the desired format
            const payload = {
                id: Number(userId),
                user_name: formData.user_name,
                user_email: formData.user_email,
                password: formData.password,
                contact_number: formData.contact_number,
                user_address: formData.user_address
            };

            try {
                const response = await axios.put(`http://localhost:8080/user/update/${userId}`, payload);
                if (response.status !== 200) {
                    throw new Error('Failed to update user data');
                }

                toast.success('User data successfully updated');
            } catch (error) {
                toast.error('Error updating user data');
            }
        } else {
            toast.error('User ID not found in local storage');
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        readOnly
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="user_name">Name:</label>
                    <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="user_email">Email:</label>
                    <input
                        type="email"
                        id="user_email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contact_number">Contact Number:</label>
                    <input
                        type="text"
                        id="contact_number"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="user_address">Address:</label>
                    <input
                        type="text"
                        id="user_address"
                        name="user_address"
                        value={formData.user_address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="button">Update</button>
            </form>
        </div>
    );
};

export default SubscriptionForm;
