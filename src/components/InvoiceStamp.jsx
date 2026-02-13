import React from 'react';

const InvoiceStamp = () => {
    return (
        <div style={{ width: '180px', height: '180px', transform: 'rotate(-20deg)', opacity: 0.8, mixBlendMode: 'multiply' }}>
            <svg viewBox="0 0 200 200" width="100%" height="100%">
                <defs>
                    <path id="curveTop" d="M 30,100 A 70,70 0 0,1 170,100" />
                    <path id="curveBottom" d="M 30,100 A 70,70 0 0,0 170,100" />
                    {/* Grunge filter for ink effect */}
                    <filter id="grunge">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                    </filter>
                </defs>

                <g filter="url(#grunge)" fill="#c0392b" stroke="#c0392b">
                    {/* Outer Double Circle */}
                    <circle cx="100" cy="100" r="95" fill="none" strokeWidth="4" />
                    <circle cx="100" cy="100" r="90" fill="none" strokeWidth="1" />

                    {/* Inner Circle */}
                    <circle cx="100" cy="100" r="75" fill="none" strokeWidth="2" />

                    {/* Center Text */}
                    <text x="100" y="115" textAnchor="middle" stroke="none" fontSize="42" fontWeight="900" style={{ letterSpacing: '4px', fontFamily: 'Courier New, monospace' }}>
                        PAID
                    </text>

                    {/* Top Curve Text */}
                    <text fontSize="14" fontWeight="bold" letterSpacing="2" stroke="none">
                        <textPath href="#curveTop" startOffset="50%" textAnchor="middle">
                            QUICKSERVE VERIFIED
                        </textPath>
                    </text>

                    {/* Bottom Curve Text */}
                    <text fontSize="14" fontWeight="bold" letterSpacing="2" stroke="none">
                        <textPath href="#curveBottom" startOffset="50%" textAnchor="middle">
                            THANK YOU
                        </textPath>
                    </text>
                </g>
            </svg>
        </div>
    );
};

export default InvoiceStamp;
