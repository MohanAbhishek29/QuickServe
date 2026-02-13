import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveUser, getUser } from '../utils/storage';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if there's a stored user from registration
        const registeredUser = getUser();

        if (registeredUser && registeredUser.email === formData.email) {
            // Login successful with existing user
            // In real app, check password too.
        } else {
            // Create new session user from input if not registered
            // Extract name from email if not provided (Login doesn't have name field usually, but for prototype we can infer or just use "User")
            const newUser = {
                name: formData.email.split('@')[0], // Fallback name from email
                email: formData.email,
                location: "Bhimavaram" // Default
            };
            saveUser(newUser);
        }

        navigate('/');
    };

    return (
        <div className="flex center-all" style={{ minHeight: '100vh', padding: '20px' }}>
            <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '40px', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '24px', fontSize: '2rem', background: 'var(--secondary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '800' }}>
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="grid" style={{ gap: '16px' }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '16px' }}>
                        Login
                    </button>
                </form>

                <p style={{ marginTop: '24px', color: '#666' }}>
                    New to QuickServe? <Link to="/register" style={{ color: 'var(--secondary)', fontWeight: 'bold', textDecoration: 'none' }}>Register</Link>
                </p>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.1)',
    background: 'rgba(255,255,255,0.8)',
    fontSize: '1rem',
    outline: 'none',
    width: '100%'
};

export default Login;
