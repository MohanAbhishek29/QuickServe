import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BookingModal from '../components/BookingModal';
import Chatbot from '../components/Chatbot';

const HomePage = () => {
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState(null);
    const [activeBooking, setActiveBooking] = useState(null);

    useEffect(() => {
        // Check for active booking on load
        const bookings = JSON.parse(localStorage.getItem('qs_bookings') || '[]');
        if (bookings.length > 0) {
            setActiveBooking(bookings[0]); // Get latest
        }
    }, [selectedService]);

    const handleServiceSelect = (service) => {
        setSelectedService(service);
    };

    const handleCloseModal = () => {
        setSelectedService(null);
        // Refresh active booking
        const bookings = JSON.parse(localStorage.getItem('qs_bookings') || '[]');
        if (bookings.length > 0) setActiveBooking(bookings[0]);
    };

    return (
        <div>
            <Header />
            <Hero />

            <div className="container" style={{ marginBottom: '60px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>About QuickServe</h2>
                <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
                    QuickServe is revolutionizing home services with our <strong>15-Minute Promise</strong>.
                    Founded in 2026, we connect you with verified local experts instantly.
                    Whether it's a leaky tap or a dusty home, our "Smart Geo-Fencing" technology finds the nearest helper
                    to ensure help arrives before you finish your coffee.
                </p>
                <div className="flex center-all" style={{ gap: '40px', marginTop: '32px' }}>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', fontWeight: '900' }}>500+</h3>
                        <p>Verified Experts</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', color: 'var(--secondary)', fontWeight: '900' }}>15min</h3>
                        <p>Avg. Arrival Time</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', color: 'var(--success)', fontWeight: '900' }}>10k+</h3>
                        <p>Happy Customers</p>
                    </div>
                </div>
            </div>

            {activeBooking && (
                <div className="container" style={{ marginBottom: '24px' }}>
                    <div className="glass-card flex justify-between animate-fade-in" style={{ borderLeft: '5px solid var(--success)', background: 'rgba(240, 255, 244, 0.8)' }}>
                        <div>
                            <h3 style={{ color: 'var(--success)', fontSize: '1.2rem', fontWeight: 'bold' }}>Active Booking: {activeBooking.service}</h3>
                            <p style={{ color: '#555', marginTop: '4px' }}>
                                Helper: <b>{activeBooking.helper}</b> • ETA: <b>{activeBooking.eta}</b>
                            </p>
                        </div>
                        <div className="badge">{activeBooking.status}</div>
                    </div>
                </div>
            )}

            <div className="container" style={{ textAlign: 'center', marginBottom: '60px' }}>
                <button
                    className="btn hover-scale"
                    style={{
                        padding: '16px 40px',
                        fontSize: '1.2rem',
                        borderRadius: '50px',
                        background: 'var(--primary-gradient)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }}
                    onClick={() => navigate('/services')} // Navigate to new list page
                >
                    View All Services 🛠️
                </button>
            </div>

            {selectedService && (
                <BookingModal
                    service={selectedService}
                    onClose={handleCloseModal}
                />
            )}

            {/* Footer / Trust Badge */}
            <div style={{ textAlign: 'center', padding: '40px', color: '#666', background: 'rgba(255,255,255,0.5)' }}>
                <p>🔒 Secure Payments • 🛡️ Verified Helpers • ⚡ 15-Min Guarantee</p>
                <p style={{ fontSize: '0.8rem', marginTop: '8px' }}>© 2026 QuickServe Inc.</p>
            </div>

            <Chatbot onSelectService={handleServiceSelect} />
        </div>
    );
};

export default HomePage;
