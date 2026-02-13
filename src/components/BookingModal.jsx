import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { findNearestHelper, calculateETA, generateBookingID } from '../utils/geoLogic';
import { saveBooking } from '../utils/storage';

const BookingModal = ({ service, onClose }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState('searching'); // searching -> found -> confirmed
    const [helper, setHelper] = useState(null);
    const [eta, setEta] = useState(null);
    const [bookingId, setBookingId] = useState(null);

    useEffect(() => {
        if (step === 'searching' && service) {
            const searchForHelper = async () => {
                const userLat = 0;
                const userLng = 0;
                const foundHelper = await findNearestHelper(service.name, userLat, userLng);

                if (foundHelper) {
                    setHelper(foundHelper);
                    setEta(calculateETA(foundHelper.distance));
                    setStep('found');
                } else {
                    setStep('not-found');
                }
            };
            searchForHelper();
        }
    }, [step, service]);

    const handleConfirm = () => {
        const newId = generateBookingID();
        setBookingId(newId);
        setStep('confirmed');
        saveBooking({
            id: newId,
            service: service.name,
            helper: helper.name,
            eta: eta,
            status: 'Confirmed',
            timestamp: new Date().toISOString()
        });
    };

    if (!service) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div className="glass-card animate-fade-in" style={{ width: '450px', maxWidth: '90%', textAlign: 'center', padding: '40px', background: 'white' }}>

                {step === 'searching' && (
                    <div>
                        <div className="spinner" style={{ fontSize: '4rem', animation: 'spin 1.5s infinite linear', marginBottom: '24px' }}>🛰️</div>
                        <h3 style={{ margin: '16px 0', fontSize: '1.5rem' }}>Creating Geo-Fence...</h3>
                        <p style={{ color: '#666' }}>Scanning for {service.name} experts within 2km...</p>
                    </div>
                )}

                {step === 'found' && helper && (
                    <div>
                        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
                        <h3 style={{ marginBottom: '8px', fontSize: '1.5rem' }}>Helper Found!</h3>

                        <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '16px', margin: '24px 0', textAlign: 'left', border: '1px solid #eee' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{helper.name}</span>
                                <span style={{ background: '#FFF3E0', color: '#F57C00', padding: '4px 8px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>⭐ {helper.rating}</span>
                            </div>
                            <div style={{ color: '#666', marginBottom: '16px' }}>📍 {helper.distance}km away</div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: '#E3F2FD', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🕒</div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Estimated Arrival</div>
                                    <div style={{ fontWeight: 'bold', color: 'var(--secondary)', fontSize: '1.1rem' }}>{eta}</div>
                                </div>
                            </div>
                        </div>

                        <button className="btn" style={{ width: '100%', fontSize: '1.1rem' }} onClick={handleConfirm}>
                            Confirm Booking
                        </button>
                    </div>
                )}

                {step === 'confirmed' && (
                    <div>
                        <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🎉</div>
                        <h2 style={{ color: '#00C851', marginBottom: '12px' }}>Booking Confirmed!</h2>
                        <p style={{ fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '8px', letterSpacing: '1px' }}>ID: {bookingId}</p>
                        <p style={{ marginBottom: '32px', color: '#666' }}>Your helper is on the way.<br />Arriving in {eta}.</p>
                        <button className="btn" style={{ width: '100%', background: '#333' }} onClick={() => navigate(`/billing/${bookingId}`)}>
                            View Invoice & Pay
                        </button>
                        <button
                            className="btn"
                            style={{ width: '100%', marginTop: '12px', background: 'transparent', border: '1px solid #ddd', color: '#333' }}
                            onClick={() => navigate('/')}
                        >
                            Back to Home
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default BookingModal;
