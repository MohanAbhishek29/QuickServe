import React from 'react';

const InvoiceStamp = () => {
    return (
        <div style={{ width: '180px', height: '180px', transform: 'rotate(-20deg)', opacity: 0.9 }}>
            <svg viewBox="0 0 200 200" width="100%" height="100%">
                <defs>
                    <path id="curveTop" d="M 30,100 A 70,70 0 0,1 170,100" />
                    <path id="curveBottom" d="M 30,100 A 70,70 0 0,0 170,100" />
                </defs>

                {/* Outer Circle */}
                <circle cx="100" cy="100" r="95" fill="none" stroke="#D32F2F" strokeWidth="6" />

                {/* Inner Dashed Circle */}
                <circle cx="100" cy="100" r="85" fill="none" stroke="#D32F2F" strokeWidth="2" strokeDasharray="5,5" />

                {/* Center Text */}
                <text x="100" y="115" textAnchor="middle" fill="#D32F2F" fontSize="40" fontWeight="900" style={{ letterSpacing: '2px' }}>
                    PAID
                </text>

                {/* Top Curve Text */}
                <text fill="#D32F2F" fontSize="16" fontWeight="bold" letterSpacing="1">
                    <textPath href="#curveTop" startOffset="50%" textAnchor="middle">
                        QUICKSERVE.COM
                    </textPath>
                </text>

                {/* Bottom Curve Text */}
                <text fill="#D32F2F" fontSize="16" fontWeight="bold" letterSpacing="1">
                    <textPath href="#curveBottom" startOffset="50%" textAnchor="middle">
                        THANK YOU
                    </textPath>
                </text>
            </svg>
        </div>
    );
};

export default InvoiceStamp;
