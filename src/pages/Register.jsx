import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveUser } from '../utils/storage';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        location: 'Bhimavaram'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.name || !formData.email || !formData.password) return;

        // Save user to simulated DB
        saveUser(formData);

        // Redirect to Home
        navigate('/');
    };

    return (
        <div className="flex center-all" style={{ minHeight: '100vh', padding: '20px' }}>
            <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '450px', padding: '40px', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '24px', fontSize: '2rem', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '800' }}>
                    Join QuickServe
                </h2>

                <form onSubmit={handleSubmit} className="grid" style={{ gap: '16px' }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
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
                    <input
                        type="text"
                        name="address"
                        placeholder="Home Address"
                        value={formData.address}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option>Bhimavaram</option>
                        <option>LPU Campus</option>
                        <option>Hyderabad</option>
                    </select>

                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '16px' }}>
                        Create Account
                    </button>
                </form>

                <p style={{ marginTop: '24px', color: '#666' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
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

export default Register;
