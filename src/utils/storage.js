/**
 * QuickServe LocalStorage Manager
 * Stores bookings and user session data.
 */

const KEYS = {
    BOOKINGS: 'qs_bookings',
    USER: 'qs_user',
};

export const saveBooking = (booking) => {
    const existing = getBookings();
    const updated = [booking, ...existing];
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
};

export const getBookings = () => {
    const data = localStorage.getItem(KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
};

export const saveUser = (user) => {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
};

export const getUser = () => {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
};
