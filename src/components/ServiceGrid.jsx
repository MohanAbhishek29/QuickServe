import React from 'react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
    { id: 'service_cleaning', name: 'Cleaning', icon: '🧹', color: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)' },
    { id: 'service_plumbing', name: 'Plumbing', icon: '🔧', color: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)' },
    { id: 'service_electric', name: 'Electrician', icon: '⚡', color: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)' },
    { id: 'service_pest', name: 'Pest Control', icon: '🐜', color: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)' },
    { id: 'service_ac', name: 'AC Repair', icon: '❄️', color: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)' },
    { id: 'service_paint', name: 'Painting', icon: '🎨', color: 'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)' },
];

const ServiceGrid = () => {
    const navigate = useNavigate();
    return (
        <div className="container" style={{ marginBottom: '80px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '32px', fontWeight: '800', textAlign: 'center' }}>Popular Services</h3>

            <div className="grid grid-cols-4" style={{ gap: '32px' }}>
                {SERVICES.map((service, index) => (
                    <div
                        key={service.id}
                        className="glass-card hover-scale animate-fade-in"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            background: 'rgba(255,255,255,0.8)',
                            minHeight: '180px',
                            animationDelay: `${index * 0.1}s`,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onClick={() => navigate(`/service/${service.name.toLowerCase()}`)}
                    >
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: service.color,
                            opacity: 0.15,
                            zIndex: 0
                        }} />

                        <div style={{ fontSize: '3.5rem', marginBottom: '16px', zIndex: 1, filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.1))' }}>
                            {service.icon}
                        </div>
                        <h4 style={{ fontWeight: '700', fontSize: '1.2rem', zIndex: 1, color: '#333' }}>{service.name}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceGrid;
