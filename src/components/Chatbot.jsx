import React, { useState, useRef, useEffect } from 'react';

const SERVICES_KEYWORDS = {
    'Cleaning': ['clean', 'dust', 'saaf', 'mop', 'sweep', 'dirty', 'mess'],
    'Plumbing': ['leak', 'pipe', 'water', 'drip', 'clog', 'sink', 'tap'],
    'Electrician': ['shock', 'wire', 'light', 'fan', 'switch', 'power', 'current'],
    'Pest Control': ['cockroach', 'ant', 'bug', 'rat', 'termite', 'pest'],
    'AC Repair': ['cool', 'hot', 'ac', 'air', 'conditioner', 'gas'],
    'Painting': ['paint', 'wall', 'color', 'brush']
};

const Chatbot = ({ onSelectService }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm QuickBot 🤖. Tell me what you need? (e.g., 'Kitchen saaf karna hai')", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate AI thinking
        setTimeout(() => {
            const lowerInput = input.toLowerCase();
            let foundService = null;

            for (const [service, keywords] of Object.entries(SERVICES_KEYWORDS)) {
                if (keywords.some(k => lowerInput.includes(k))) {
                    foundService = service;
                    break;
                }
            }

            if (foundService) {
                setMessages(prev => [...prev, {
                    text: `I understood! connecting you with a ${foundService} expert nearby... ⚡`,
                    sender: 'bot'
                }]);

                setTimeout(() => {
                    onSelectService({ name: foundService });
                }, 1500);

            } else {
                setMessages(prev => [...prev, {
                    text: "I didn't quite catch that. Try asking for 'Cleaning', 'Plumbing', etc.",
                    sender: 'bot'
                }]);
            }
        }, 800);
    };

    return (
        <>
            {/* Toggle Button */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="hover-scale"
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    width: '60px',
                    height: '60px',
                    background: 'var(--primary-gradient)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(255, 107, 53, 0.4)',
                    cursor: 'pointer',
                    zIndex: 9999
                }}
            >
                <span style={{ fontSize: '1.8rem' }}>{isOpen ? '❌' : '🤖'}</span>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="glass-card animate-fade-in"
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '24px',
                        width: '350px',
                        height: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 9998,
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.8)'
                    }}
                >
                    {/* Header */}
                    <div style={{ padding: '16px', background: 'var(--secondary-gradient)', color: 'white' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>QuickBot Support</h3>
                        <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>⚡ Instant Replies</p>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                style={{
                                    marginBottom: '12px',
                                    display: 'flex',
                                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                                }}
                            >
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '10px 14px',
                                    borderRadius: '12px',
                                    borderBottomRightRadius: msg.sender === 'user' ? '0' : '12px',
                                    borderBottomLeftRadius: msg.sender === 'bot' ? '0' : '12px',
                                    background: msg.sender === 'user' ? 'var(--primary-gradient)' : 'white',
                                    color: msg.sender === 'user' ? 'white' : '#333',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    fontSize: '0.9rem'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={endRef} />
                    </div>

                    {/* Input */}
                    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.9)', display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type here..."
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '50px',
                                border: '1px solid #ddd',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={handleSend}
                            style={{
                                background: 'var(--secondary)',
                                color: 'white',
                                border: 'none',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                cursor: 'pointer'
                            }}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
