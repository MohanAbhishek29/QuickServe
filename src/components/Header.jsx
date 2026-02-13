import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../utils/storage';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('qs_user');
        setUser(null);
        navigate('/login');
    };

    const handleLocationChange = (e) => {
        const newLoc = e.target.value;
        if (user) {
            const updatedUser = { ...user, location: newLoc };
            setUser(updatedUser);
            localStorage.setItem('qs_user', JSON.stringify(updatedUser)); // Persist change
            window.location.reload(); // Force reload to update regional data across app
        }
    };

    return (
        <header style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: '16px 0',
            borderBottom: '1px solid rgba(255,255,255,0.3)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
            <div className="container flex justify-between">
                <div className="flex hover-scale" style={{ gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <div style={{ background: 'var(--primary-gradient)', color: 'white', padding: '8px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.2rem' }}>QS</div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '800', background: 'var(--secondary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>QuickServe</h1>
                </div>

                <div className="flex" style={{ gap: '24px' }}>
                    {user ? (
                        <>
                            <div className="location-selector flex" style={{ color: '#555', background: 'rgba(0,0,0,0.05)', padding: '8px 16px', borderRadius: '50px' }}>
                                <span style={{ marginRight: '6px' }}>📍</span>
                                <select
                                    value={user.location || 'Bhimavaram'}
                                    onChange={handleLocationChange}
                                    style={{ border: 'none', background: 'transparent', fontWeight: 'bold', cursor: 'pointer', outline: 'none', color: '#333' }}
                                >
                                    <option value="Bhimavaram">Bhimavaram</option>
                                    <option value="LPU Campus">LPU Campus</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                </select>
                            </div>

                            <div className="flex" style={{ gap: '16px' }}>
                                <button onClick={() => navigate('/history')} className="btn" style={{ padding: '8px 16px', fontSize: '0.9rem', background: 'var(--secondary-gradient)' }}>
                                    My Bookings
                                </button>
                                <div className="user-profile flex" style={{ gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'var(--secondary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                        {user.name.charAt(0)}
                                    </div>
                                    <span style={{ fontWeight: '600', color: '#333' }}>{user.name}</span>
                                    <button onClick={handleLogout} style={{ border: 'none', background: 'transparent', color: '#666', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '8px' }}>
                                        (Logout)
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <button onClick={() => navigate('/login')} className="btn">
                            Login / Register
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
