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
    // Get employees based on region and service category
    const user = getUser();
    const loc = user ? user.location : 'Bhimavaram';

    // Determine the category key based on the service type
    let categoryKey = 'Technical'; // Default fallback
    if (['Cleaning', 'Maid'].includes(serviceType)) categoryKey = 'Cleaning';
    else if (['Cooking', 'Chef'].includes(serviceType)) categoryKey = 'Cooking';
    else if (['Salon', 'Barber', 'Makeup'].includes(serviceType)) categoryKey = 'Salon';

    // Get the specific pool for this region and category
    const regionData = EMPLOYEES[loc] || EMPLOYEES['Bhimavaram'];
    const employeeNames = regionData[categoryKey] || regionData['Technical'];

    // Helper to generate a number from string (deterministic random)
    const getHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    };

    const companyHash = getHash(companyName + id);

    // Select a random subset of 12 employees based on the company hash
    const subsetSize = 12;
    const startIndex = companyHash % Math.max(1, employeeNames.length - subsetSize);

    // Create a deterministic shuffled version of the list for this company
    // (Simple slice for now, but starting at different indices)
    let selectedNames = [...employeeNames];

    // Fisher-Yates shuffle seeded by companyHash (simplified)
    for (let i = selectedNames.length - 1; i > 0; i--) {
        const j = (companyHash * (i + 1)) % (i + 1);
        [selectedNames[i], selectedNames[j]] = [selectedNames[j], selectedNames[i]];
    }

    selectedNames = selectedNames.slice(0, subsetSize);

    // Helper to determine gender from name (Specific to this Mock Data)
    const getGender = (name, category) => {
        // Known exceptions in Technical/Movers categories
        const femaleTechNames = ['Preeti', 'Sita', 'Lakshmi', 'Anjali', 'Kalyani', 'Jyothi', 'Ramya', 'Bhavani', 'Durga', 'Sravani', 'Meena', 'Rani', 'Swapna', 'Deepa', 'Sandhya', 'Lavanya'];

        if (['Cleaning', 'Cooking', 'Salon'].includes(category)) return 'F';

        // For Technical/Movers, assume Male unless in known list
        if (femaleTechNames.some(f => name.includes(f))) return 'F';

        return 'M';
    };

    // Helper to get avatar based on Category + Gender
    const getAvatar = (category, gender) => {
        const avatars = {
            Cleaning: { F: '👩‍🧹', M: '👨‍🧹' },
            Cooking: { F: '👩‍🍳', M: '👨‍🍳' },
            Salon: { F: '💇‍♀️', M: '💇‍♂️' },
            Technical: { F: '👩‍🔧', M: '👨‍🔧' }
        };
        const type = avatars[category] || avatars['Technical'];
        return type[gender];
    };

    // Generate mock employee objects
    const employees = selectedNames.map((name, index) => {
        // Deterministic ratings/prices based on name + company
        const empHash = getHash(name + companyName);
        const gender = getGender(name, categoryKey);

        return {
            id: `${id}_emp_${index}`,
            name: name,
            rating: (3.8 + (empHash % 13) / 10).toFixed(1), // Random rating 3.8 - 5.0
            price: 300 + (empHash % 40) * 10, // Random price 300 - 700
            avatar: getAvatar(categoryKey, gender)
        };
    });

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

                <div className="responsive-grid-4">
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
