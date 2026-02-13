import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EMPLOYEES } from '../utils/mockData';

const PartnerLogin = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Flatten employees list to check existence
        let found = false;
        let role = '';

        Object.keys(EMPLOYEES).forEach(region => {
            Object.keys(EMPLOYEES[region]).forEach(category => {
                if (EMPLOYEES[region][category].includes(name)) {
                    found = true;
                    role = category;
                }
            });
        });

        if (found) {
            localStorage.setItem('qs_partner', JSON.stringify({ name, role }));
            navigate('/partner/dashboard');
        } else {
            setError('Employee not found. Please use your registered full name.');
        }
    };

    return (
        <div className="flex center-all" style={{ minHeight: '100vh', background: '#1a1a1a', color: 'white' }}>
            <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👷‍♂️</div>
                <h2 style={{ marginBottom: '8px', fontSize: '2rem', fontWeight: '800' }}>Partner Access</h2>
                <p style={{ color: '#aaa', marginBottom: '32px' }}>QuickServe Employee Portal</p>

                <form onSubmit={handleLogin} className="grid" style={{ gap: '16px' }}>
                    <input
                        type="text"
                        placeholder="Enter your Full Name (e.g., Sita M)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            padding: '14px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            background: 'rgba(0,0,0,0.3)',
                            fontSize: '1rem',
                            outline: 'none',
                            width: '100%',
                            color: 'white'
                        }}
                        autoFocus
                    />

                    {error && <p style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{error}</p>}

                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '8px', background: 'var(--primary-gradient)' }}>
                        Enter Dashboard
                    </button>
                </form>

                <p style={{ marginTop: '32px', fontSize: '0.9rem', color: '#666' }}>
                    <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/')}>Back to Customer Home</span>
                </p>
            </div>
        </div>
    );
};

export default PartnerLogin;
