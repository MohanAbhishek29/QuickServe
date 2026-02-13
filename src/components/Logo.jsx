import React from 'react';

const Logo = ({ size = 40 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hover-scale"
        >
            {/* Background shape - House Base */}
            <path
                d="M50 10L10 45V90H40V65H60V90H90V45L50 10Z"
                fill="url(#logo-gradient)"
                stroke="white"
                strokeWidth="2"
            />
            {/* Lightning Bolt Overlay */}
            <path
                d="M55 25L35 55H50L45 85L65 55H50L55 25Z"
                fill="#FF6B35"
                stroke="white"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.2))' }}
            />

            <defs>
                <linearGradient id="logo-gradient" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#004E89" />
                    <stop offset="1" stopColor="#002D50" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default Logo;
