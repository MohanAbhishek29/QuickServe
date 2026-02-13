import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookings, saveBooking } from '../utils/storage';
import Logo from '../components/Logo';

const PartnerDashboard = () => {
    const navigate = useNavigate();
    const [partner, setPartner] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedPartner = localStorage.getItem('qs_partner');
        if (!storedPartner) {
            navigate('/partner/login');
            return;
        }
        setPartner(JSON.parse(storedPartner));
    }, [navigate]);

    useEffect(() => {
        if (partner) {
            const allBookings = getBookings();
            // Filter bookings for this partner
            const myBookings = allBookings.filter(b => b.helper === partner.name);
            setBookings(myBookings);
        }
    }, [partner]);

    const handleStatusUpdate = (bookingId, newStatus) => {
        const allBookings = getBookings();
        const updatedBookings = allBookings.map(b => {
            if (b.id === bookingId) {
                return { ...b, status: newStatus };
            }
            return b;
        });

        // Save back to storage
        // Note: In a real app, we'd have a clearer updateBooking function
        // Re-saving the entire array is a simplified approach for this demo
        localStorage.setItem('qs_bookings', JSON.stringify(updatedBookings));

        // Update local state
        setBookings(updatedBookings.filter(b => b.helper === partner.name));
    };

    const handleLogout = () => {
        localStorage.removeItem('qs_partner');
        navigate('/partner/login');
    };

    if (!partner) return null;

    const activeJobs = bookings.filter(b => b.status !== 'Completed');
    const completedJobs = bookings.filter(b => b.status === 'Completed');
    const totalEarnings = completedJobs.length * 500; // Mock calculation

    return (
        <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
            {/* Header */}
            <header style={{ background: '#fff', padding: '16px 0', borderBottom: '1px solid #eee' }}>
                <div className="container flex justify-between">
                    <div className="flex" style={{ gap: '12px' }}>
                        <Logo size={40} />
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#333' }}>Partner<span style={{ color: 'var(--primary)' }}>Hub</span></h1>
                    </div>
                    <div className="flex" style={{ gap: '16px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 'bold' }}>{partner.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{partner.role} Expert</div>
                        </div>
                        <button onClick={handleLogout} className="btn" style={{ padding: '8px 16px', fontSize: '0.8rem', background: '#333' }}>Logout</button>
                    </div>
                </div>
            </header>

            <div className="container" style={{ padding: '40px 20px' }}>
                {/* Stats */}
                <div className="grid grid-cols-3" style={{ marginBottom: '40px' }}>
                    <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{activeJobs.length}</div>
                        <div style={{ color: '#666' }}>Active Jobs</div>
                    </div>
                    <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{completedJobs.length}</div>
                        <div style={{ color: '#666' }}>Jobs Completed</div>
                    </div>
                    <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00C851' }}>₹{totalEarnings}</div>
                        <div style={{ color: '#666' }}>Total Earnings</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '40px' }}>

                    {/* Active Jobs */}
                    <div>
                        <h2 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>Active Assignments</h2>
                        {activeJobs.length === 0 ? (
                            <p style={{ color: '#999', fontStyle: 'italic' }}>No active jobs at the moment.</p>
                        ) : (
                            <div className="grid" style={{ gap: '16px' }}>
                                {activeJobs.map(job => (
                                    <div key={job.id} className="glass-card" style={{ padding: '20px', borderLeft: '4px solid var(--primary)' }}>
                                        <div className="flex justify-between" style={{ marginBottom: '8px' }}>
                                            <span style={{ fontWeight: 'bold' }}>{job.service}</span>
                                            <span style={{ fontSize: '0.9rem', background: '#e3f2fd', padding: '4px 8px', borderRadius: '4px', color: '#1565c0' }}>{job.status}</span>
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '16px' }}>
                                            <div>ID: {job.id}</div>
                                            <div style={{ margin: '8px 0', padding: '8px', background: 'rgba(0,0,0,0.03)', borderRadius: '4px' }}>
                                                <strong>Customer:</strong> {job.user}<br />
                                                <strong>Address:</strong> {job.address}
                                            </div>
                                            <div>Time: {new Date(job.timestamp).toLocaleString()}</div>
                                        </div>

                                        <div className="flex" style={{ gap: '12px', flexWrap: 'wrap' }}>
                                            {job.status === 'Confirmed' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(job.id, 'Accepted')}
                                                    className="btn"
                                                    style={{ width: '100%', fontSize: '0.9rem', background: '#00C851' }}
                                                >
                                                    Accept Order
                                                </button>
                                            )}

                                            {(job.status === 'Accepted' || job.status === 'In Progress') && (
                                                <>
                                                    <button
                                                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`, '_blank')}
                                                        className="btn"
                                                        style={{ flex: 1, fontSize: '0.9rem', background: '#4285F4' }}
                                                    >
                                                        📍 Navigate
                                                    </button>

                                                    {job.status === 'Accepted' ? (
                                                        <button
                                                            onClick={() => handleStatusUpdate(job.id, 'In Progress')}
                                                            className="btn"
                                                            style={{ flex: 1, fontSize: '0.9rem' }}
                                                        >
                                                            Start Job
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleStatusUpdate(job.id, 'Completed')}
                                                            className="btn"
                                                            style={{ flex: 1, fontSize: '0.9rem', background: '#00C851' }}
                                                        >
                                                            Mark Complete
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Past Jobs */}
                    <div>
                        <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', color: '#666' }}>History</h2>
                        <div className="grid" style={{ gap: '16px' }}>
                            {completedJobs.map(job => (
                                <div key={job.id} style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #eee', opacity: 0.8 }}>
                                    <div className="flex justify-between">
                                        <span style={{ fontWeight: 'bold', color: '#333' }}>{job.service}</span>
                                        <span style={{ color: '#00C851', fontWeight: 'bold' }}>₹500</span>
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '4px' }}>
                                        {new Date(job.timestamp).toLocaleDateString()} • ID: {job.id}
                                    </div>
                                </div>
                            ))}
                            {completedJobs.length === 0 && <p style={{ color: '#999', fontStyle: 'italic' }}>No completed jobs yet.</p>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PartnerDashboard;
