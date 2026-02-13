import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/service/${searchTerm.trim()}`);
        } else {
            alert("Please enter a service name like 'Cleaning', 'Plumbing' etc.");
        }
    };

    return (
        <div className="hero-section flex" style={{
            background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
            padding: '80px 0',
            position: 'relative',
            overflow: 'visible', // Changed from hidden to visible
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            {/* Background decorations */}
            <div className="blob" style={{ position: 'absolute', top: '-10%', left: '-5%', width: '400px', height: '400px', background: 'var(--primary-gradient)', opacity: 0.1, borderRadius: '50%' }}></div>
            <div className="blob" style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '300px', height: '300px', background: 'var(--secondary-gradient)', opacity: 0.1, borderRadius: '50%' }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="badge" style={{ marginBottom: '16px', display: 'inline-block' }}>✨ Trusted by 50,000+ Students & Families</div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '24px', background: 'linear-gradient(45deg, #333, #666)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Instant Home Services, <br />
                        <span style={{ color: 'var(--primary)' }}>On Demand. ⚡</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '32px', lineHeight: '1.6' }}>
                        From cleaning to repairs, get expert help in minutes. <br />
                        <b>Bhimavaram • LPU Campus • Hyderabad</b>
                    </p>

                    <div className="search-bar flex hover-scale" style={{
                        background: 'white',
                        padding: '8px',
                        borderRadius: '50px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        maxWidth: '600px',
                        margin: '0 auto',
                        position: 'relative', // For absolute positioning of dropdown
                        zIndex: 50 // Ensures dropdown stays above subsequent text
                    }}>
                        <input
                            type="text"
                            placeholder="What do you need help with?"
                            style={{ border: 'none', padding: '16px 24px', flex: 1, outline: 'none', fontSize: '1.1rem', borderRadius: '50px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            className="btn"
                            style={{ padding: '12px 32px', borderRadius: '50px' }}
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                        {/* Search Suggestions Dropdown */}
                        {searchTerm.length > 0 && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: '0',
                                right: '0',
                                marginTop: '12px',
                                background: 'white',
                                borderRadius: '16px',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                                zIndex: 100, // Increased Z-Index
                                overflow: 'hidden',
                                textAlign: 'left',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}>
                                {/* Mock Suggestions Logic - In real app, filter SERVICES_LIST */}
                                {['Cleaning', 'Cooking', 'Plumbing', 'AC Repair', 'Salon', 'Electrical', 'Painting', 'Carpentry', 'Pest Control', 'Movers', 'Gardening']
                                    .filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .slice(0, 5) // Limit to 5 suggestions
                                    .map((service, idx) => (
                                        <div
                                            key={idx}
                                            className="suggestion-item"
                                            onClick={() => navigate(`/service/${service}`)}
                                            style={{
                                                padding: '12px 20px',
                                                borderBottom: idx !== 4 ? '1px solid #eee' : 'none',
                                                color: '#333'
                                            }}
                                        >
                                            🔍 {service}
                                        </div>
                                    ))}
                                {['Cleaning', 'Cooking', 'Plumbing', 'AC Repair', 'Salon', 'Electrical', 'Painting', 'Carpentry', 'Pest Control', 'Movers', 'Gardening']
                                    .filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                                        <div style={{ padding: '16px', color: '#888', textAlign: 'center' }}>No services found</div>
                                    )}
                            </div>
                        )}
                    </div>

                    <p style={{ fontSize: '1rem', opacity: 0.8, marginTop: '24px', color: '#888' }}>
                        Try searching for: <b>Cleaning, Plumbing, Cooking, Salon...</b>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Hero;
