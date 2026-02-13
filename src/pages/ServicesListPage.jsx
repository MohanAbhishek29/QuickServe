import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { SERVICES_LIST } from '../utils/mockData';

const ServicesListPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
                <div className="flex justify-between" style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>All Services</h2>
                    <button onClick={() => navigate('/')} className="btn" style={{ background: 'transparent', border: '1px solid #ddd', color: '#333' }}>
                        Back to Home
                    </button>
                </div>

                <div className="grid grid-cols-4" style={{ gap: '24px' }}>
                    {SERVICES_LIST.map(service => (
                        <div
                            key={service.id}
                            className="glass-card flex hover-scale"
                            style={{
                                flexDirection: 'column',
                                padding: '32px',
                                alignItems: 'center',
                                cursor: 'pointer',
                                textAlign: 'center',
                                background: 'rgba(255,255,255,0.6)'
                            }}
                            onClick={() => navigate(`/service/${service.name}`)}
                        >
                            <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>{service.icon}</div>
                            <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{service.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesListPage;
