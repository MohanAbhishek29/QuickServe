import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../utils/storage';
import Logo from './Logo';

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
                <div className="flex hover-scale" style={{ gap: '12px', cursor: 'pointer', alignItems: 'center' }} onClick={() => navigate('/')}>
                    <Logo size={48} />
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', background: 'var(--secondary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>QuickServe</h1>
                </div>

                <div className="flex" style={{ gap: '24px' }}>
                    {user ? (
                        <>
                            <div className="location-selector" style={{ position: 'relative' }}>
                                <div
                                    onClick={() => setUser({ ...user, isDropdownOpen: !user.isDropdownOpen })}
                                    className="flex hover-scale"
                                    style={{
                                        color: '#333',
                                        background: 'rgba(255,107,53,0.1)',
                                        padding: '10px 20px',
                                        borderRadius: '50px',
                                        cursor: 'pointer',
                                        border: '1px solid rgba(255,107,53,0.2)'
                                    }}
                                >
                                    <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>📍</span>
                                    <span style={{ fontWeight: '700', fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>
                                        {user.location || 'Bhimavaram'}
                                    </span>
                                    <span style={{ marginLeft: '8px', fontSize: '0.8rem' }}>▼</span>
                                </div>

                                {user.isDropdownOpen && (
                                    <div className="glass-card animate-fade-in" style={{
                                        position: 'absolute',
                                        top: '120%',
                                        left: 0,
                                        width: '200px',
                                        padding: '10px',
                                        zIndex: 1000,
                                        background: 'rgba(255,255,255,0.95)'
                                    }}>
                                        {['Bhimavaram', 'LPU Campus', 'Hyderabad'].map(loc => (
                                            <div
                                                key={loc}
                                                onClick={() => {
                                                    const updatedUser = { ...user, location: loc, isDropdownOpen: false };
                                                    setUser(updatedUser);
                                                    localStorage.setItem('qs_user', JSON.stringify(updatedUser));
                                                    window.location.reload();
                                                }}
                                                className="suggestion-item"
                                                style={{
                                                    padding: '12px 16px',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    fontWeight: '600',
                                                    color: user.location === loc ? 'var(--primary)' : '#333',
                                                    background: user.location === loc ? 'rgba(255,107,53,0.1)' : 'transparent'
                                                }}
                                            >
                                                {loc}
                                            </div>
                                        ))}
                                    </div>
                                )}
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
                    <span onClick={() => navigate('/partner/login')} style={{ fontSize: '0.8rem', color: '#999', cursor: 'pointer', alignSelf: 'center', textDecoration: 'underline' }}>
                        Partner Access
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
