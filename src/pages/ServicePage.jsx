import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../utils/storage';
import { REGIONAL_DATA } from '../utils/mockData';

const ServicePage = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [userLocation, setUserLocation] = useState('Bhimavaram');

    useEffect(() => {
        const user = getUser();
        const loc = user ? user.location : 'Bhimavaram';
        setUserLocation(loc);

        // Fetch companies based on location and service type
        const regionData = REGIONAL_DATA[loc] || REGIONAL_DATA['Bhimavaram']; // Fallback
        const serviceCompanies = regionData[type] || [];
        setCompanies(serviceCompanies);
    }, [type]);

    return (
        <div>
            <Header />
            <div className="container" style={{ paddingTop: '40px' }}>
                <div className="flex justify-between" style={{ marginBottom: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', textTransform: 'capitalize' }}>
                            {type} Companies
                        </h2>
                        <p style={{ color: '#666' }}>Showing top rated providers in <strong>{userLocation}</strong></p>
                    </div>
                    <button onClick={() => navigate('/services')} className="btn" style={{ background: 'transparent', border: '1px solid #ddd', color: '#333' }}>
                        Back to Services
                    </button>
                </div>

                <div className="grid grid-cols-3" style={{ gap: '24px' }}>
                    {companies.map(company => (
                        <div key={company.id} className="glass-card flex hover-scale" style={{ flexDirection: 'column', padding: '24px', alignItems: 'center', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', background: '#f0f0f0', borderRadius: '50%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                🏢
                            </div>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>{company.name}</h3>
                            <div style={{ color: '#666', marginBottom: '16px' }}>⭐ {company.rating} Rating</div>
                            <button
                                className="btn"
                                style={{ width: '100%', borderRadius: '8px', background: 'var(--primary-gradient)' }}
                                onClick={() => navigate(`/company/${company.id}`, { state: { companyName: company.name, serviceType: type } })}
                            >
                                View Employees
                            </button>
                        </div>
                    ))}
                    {companies.length === 0 && <p>No companies found for this service in your area.</p>}
                </div>
            </div>
        </div>
    );
};

export default ServicePage;
