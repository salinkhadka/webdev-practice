import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './displayUsers.css';

interface User {
    id: number;
    user_name: string;
    user_email: string;
    password: string;
    contact_number: string;
    user_address: string;
}

function DisplayUsers() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/user/get')
            .then(res => {
                setUsers(res.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleRemove = (userId: number) => {
        axios.delete(`http://localhost:8080/user/delete/${userId}`)
            .then(res => {
                console.log(res);
                setUsers(users.filter(user => user.id !== userId)); // Update state to remove deleted user
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <div className="display-users-container">
            <h2>User List</h2>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Contact Number</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.user_name}</td>
                            <td>{user.user_email}</td>
                            <td>{user.password}</td>
                            <td>{user.contact_number}</td>
                            <td>{user.user_address}</td>
                            <td>
                                <button onClick={() => handleRemove(user.id)} className="remove-button">
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DisplayUsers;
