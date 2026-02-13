import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import InvoiceStamp from '../components/InvoiceStamp';
import { getBookings, getUser } from '../utils/storage';

const getRegionalAddress = (location = 'Bhimavaram') => {
    const addresses = {
        'Bhimavaram': 'GGRH+5H9, Bank Colony, Bhimavaram, Andhra Pradesh 534201',
        'LPU Campus': 'Lovely professional university, BH6, Gurudwara Rd, Jalandhar, Punjab 144411',
        'Hyderabad': '35, PJR Stadium Ln, Santhi Nagar, Chanda Nagar, Hyderabad, Telangana 500050'
    };
    return addresses[location] || addresses['Bhimavaram'];
};

const BillingPage = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getUser());
        const bookings = getBookings();
        const found = bookings.find(b => b.id === bookingId);
        if (found) setBooking(found);
    }, [bookingId]);

    if (!booking) return <div className="container" style={{ padding: '50px' }}>Loading Invoice...</div>;

    const printInvoice = () => {
        window.print();
    };

    return (
        <div style={{ background: '#eee', minHeight: '100vh', paddingBottom: '40px' }}>
            <Header />

            <div className="container" style={{ marginTop: '40px', maxWidth: '800px' }}>
                <div style={{ background: 'white', padding: '40px', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', position: 'relative' }}>

                    {/* Invoice Header */}
                    <div className="flex justify-between" style={{ borderBottom: '2px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>
                        <div>
                            <h1 style={{ fontSize: '2rem', color: '#333' }}>INVOICE</h1>
                            <p style={{ color: '#666' }}>ID: {booking.id}</p>
                            <p style={{ color: '#666' }}>Date: {new Date(booking.timestamp).toLocaleDateString()}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h2 style={{ color: 'var(--primary)', fontWeight: 'bold' }}>QuickServe Inc.</h2>
                            <p style={{ fontSize: '0.9rem' }}>Bhimavaram, AP</p>
                            <p style={{ fontSize: '0.9rem' }}>support@quickserve.com</p>
                        </div>
                    </div>

                    {/* Bill To */}
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '1rem', color: '#999', textTransform: 'uppercase' }}>Bill To:</h3>
                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{user?.name || 'Vignesh Reddy'}</p>
                        <p>{user?.address || getRegionalAddress(user?.location)}</p>
                    </div>

                    {/* Table */}
                    <table style={{ width: '100%', marginBottom: '40px', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f9f9f9', textAlign: 'left' }}>
                                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Description</th>
                                <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'right' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                                    <strong>{booking.service} Service</strong><br />
                                    <span style={{ fontSize: '0.9rem', color: '#666' }}>Helper: {booking.helper}</span>
                                </td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #eee', textAlign: 'right' }}>₹500.00</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>Platform Fee</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #eee', textAlign: 'right' }}>₹50.00</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td style={{ padding: '12px', fontWeight: 'bold' }}>TOTAL</td>
                                <td style={{ padding: '12px', fontWeight: 'bold', textAlign: 'right', fontSize: '1.2rem' }}>₹550.00</td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Stamp Position */}
                    <div style={{ position: 'absolute', bottom: '150px', right: '100px', transform: 'rotate(-20deg)', opacity: 0.6, pointerEvents: 'none' }}>
                        <InvoiceStamp />
                    </div>

                    {/* Footer */}
                    <div style={{ textAlign: 'center', marginTop: '60px', color: '#999', fontSize: '0.8rem' }}>
                        <p>Thank you for choosing QuickServe!</p>
                    </div>

                    {/* No-Print Button */}
                    <div className="no-print" style={{ textAlign: 'center', marginTop: '40px', borderTop: '1px dashed #ccc', paddingTop: '20px' }}>
                        <button onClick={printInvoice} className="btn" style={{ background: '#333' }}>
                            Print Invoice 🖨️
                        </button>
                        <button onClick={() => navigate(-1)} className="btn" style={{ marginLeft: '12px', background: 'transparent', color: '#333', border: '1px solid #ddd' }}>
                            Close
                        </button>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    .no-print, header { display: none !important; }
                    body { background: white; }
                    .container { margin: 0; padding: 0; box-shadow: none; }
                }
            `}</style>
        </div>
    );
};

export default BillingPage;
