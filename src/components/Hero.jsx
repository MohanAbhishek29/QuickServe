import React from 'react';

const Hero = () => {
    return (
        <section style={{
            background: 'var(--secondary-gradient)',
            color: 'white',
            padding: '80px 20px',
            textAlign: 'center',
            borderRadius: '0 0 32px 32px',
            marginBottom: '40px',
            boxShadow: '0 10px 30px rgba(0, 78, 137, 0.3)'
        }}>
            <div className="container">
                <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(4px)',
                        display: 'inline-block',
                        padding: '8px 16px',
                        borderRadius: '50px',
                        marginBottom: '24px',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                        ⚡ 15-Minute Service Guarantee
                    </div>

                    <h2 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                        What help do you need today?
                    </h2>

                    <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                        Instant home services at your doorstep. No waiting, no negotiations.
                    </p>
                </div>

                <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', animationDelay: '0.3s' }}>
                    <input
                        type="text"
                        placeholder="Search for 'Plumbing', 'Cleaning', etc..."
                        style={{
                            width: '100%',
                            padding: '18px 28px',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: '1.1rem',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                            outline: 'none'
                        }}
                    />
                    <button style={{
                        position: 'absolute',
                        right: '8px',
                        top: '8px',
                        bottom: '8px',
                        background: 'var(--primary-gradient)',
                        color: 'white',
                        border: 'none',
                        padding: '0 32px',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(255, 107, 53, 0.3)'
                    }}>
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
