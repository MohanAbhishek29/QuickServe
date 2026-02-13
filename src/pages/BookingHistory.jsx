import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getBookings } from '../utils/storage';

const BookingHistory = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        setBookings(getBookings());
    }, []);

    return (
        <div>
            <Header />
            <div className="container" style={{ paddingTop: '40px', maxWidth: '800px' }}>
                <div className="flex justify-between" style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>My Bookings</h2>
                    <button onClick={() => navigate('/')} className="btn" style={{ background: 'transparent', border: '1px solid #ddd', color: '#333' }}>
                        Back to Home
                    </button>
                </div>

                {bookings.length === 0 ? (
                    <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                        <h3>No bookings yet.</h3>
                        <p style={{ marginBottom: '24px', color: '#666' }}>Book a service to get started!</p>
                        <button onClick={() => navigate('/')} className="btn">Browse Services</button>
                    </div>
                ) : (
                    <div className="grid" style={{ gap: '24px' }}>
                        {bookings.map(booking => (
                            <div key={booking.id} className="glass-card flex justify-between animate-fade-in" style={{ padding: '24px', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{booking.service} Service</h3>
                                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                        <span>ID: <strong>{booking.id}</strong></span> •
                                        <span> Helper: {booking.helper}</span>
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '4px' }}>
                                        {new Date(booking.timestamp).toLocaleString()}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div className="badge" style={{ display: 'inline-block', marginBottom: '8px' }}>{booking.status}</div>
                                    <br />
                                    <button
                                        onClick={() => navigate(`/billing/${booking.id}`)}
                                        style={{ background: 'none', border: 'none', color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        View Invoice
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingHistory;
