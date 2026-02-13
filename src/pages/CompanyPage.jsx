import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BookingModal from '../components/BookingModal';
import { EMPLOYEES } from '../utils/mockData';
import { getUser } from '../utils/storage';

const CompanyPage = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [selectedEmployee, setSelectedEmployee] = React.useState(null);

    const companyName = state?.companyName || 'Company';
    const serviceType = state?.serviceType || 'Service';

    // Get employees based on region (simulated, as employees are usually per company, 
    // but for this mock we use region-based names as requested)
    const user = getUser();
    const loc = user ? user.location : 'Bhimavaram';
    const employeeNames = EMPLOYEES[loc] || EMPLOYEES['Bhimavaram'];

    // Generate mock employee objects
    const employees = employeeNames.map((name, index) => ({
        id: `${id}_emp_${index}`,
        name: name,
        rating: (4 + Math.random()).toFixed(1),
        price: 400 + Math.floor(Math.random() * 200),
        avatar: ['👨‍🔧', '👩‍🔧', '👨‍🏭'][index % 3]
    }));

    const handleBook = (employee) => {
        setSelectedEmployee({ ...employee, service: serviceType, company: companyName });
    };

    return (
        <div>
            <Header />
            <div className="container" style={{ paddingTop: '40px' }}>
                <div className="flex justify-between" style={{ marginBottom: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem' }}>{companyName}</h2>
                        <p style={{ color: '#666' }}>Select an expert to book</p>
                    </div>
                    <button onClick={() => navigate(-1)} className="btn" style={{ background: 'transparent', border: '1px solid #ddd', color: '#333' }}>
                        Back to Company
                    </button>
                </div>

                <div className="grid grid-cols-4" style={{ gap: '24px' }}>
                    {employees.map(emp => (
                        <div key={emp.id} className="glass-card flex hover-scale" style={{ flexDirection: 'column', padding: '24px', alignItems: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{emp.avatar}</div>
                            <h3 style={{ fontWeight: 'bold' }}>{emp.name}</h3>
                            <div style={{ color: '#666', marginBottom: '12px', fontSize: '0.9rem' }}>
                                ⭐ {emp.rating} • ₹{emp.price}/hr
                            </div>
                            <button
                                className="btn"
                                style={{ width: '100%', borderRadius: '8px' }}
                                onClick={() => handleBook(emp)}
                            >
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedEmployee && (
                <BookingModal
                    service={{ name: selectedEmployee.service }}
                    onClose={() => setSelectedEmployee(null)}
                    preSelectedHelper={selectedEmployee}
                />
            )}
        </div>
    );
};

export default CompanyPage;
