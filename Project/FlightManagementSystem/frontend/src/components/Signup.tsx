import React from 'react';
import './stylesforsignup.css'; // Import the new CSS file
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    // const [name, setName] = useState<string>('');
    // const [email, setEmail] = useState<string>('');
    // const [password, setPassword] = useState<string>('');
    // const [confirmPassword, setConfirmPassword] = useState<string>('');

    // const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     // Handle signup logic
    // };

    const navigate= useNavigate();

    const {register,handleSubmit} =useForm()

    const submit=(data:any)=>{
        console.log(data)

        axios.post("http://localhost:8080/user/save",data).then(res=>{
            console.log(res)
toast("Data saved successfully");
navigate("/Login")
        })
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                           {...register("user_name")}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            {...register("user_email")}

                            required
                            aria-label="Email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}

                            required
                            aria-label="Password"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register("confirm_password")}

                            required
                            aria-label="Confirm Password"
                        />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <div className="login-message">
                    <p>Already have an account?</p>
                    <a href="/Login"><button className="login-button">
                        Login
                    </button></a>
                </div>
            </div>

           
        </div>
    );
};

export default Signup;
