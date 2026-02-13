# Quick Serve: The 15-Minute Home Service Promise

**Regn.no:** 12309902 Vignesh Reddy  
**Regn.no:** 12306984 J Mohan Abhishek Gupta  

**Problem Statement ID:** Problem Statement 7  
**Problem Title:** Instant Service Booking System  

## 1. Our Idea
We are developing Quick Serve, a responsive web platform designed to revolutionize the home service industry (Cleaning, Plumbing, Repairs) by strictly adhering to a "15-Minute Service Promise". Just like quick-commerce apps (e.g., Blinkit) deliver groceries instantly, Quick Serve focuses on immediate helper allocation. We eliminate the traditional waiting and negotiation process by providing instant availability checks, real-time booking confirmation, and live ETA tracking.

## 2. Proposed Approach
To ensure we meet the 15-minute deadline, our system follows a specialized 3-step logic:
- **Step 1: Smart Geo-Fencing:** When a user logs in and selects a service (e.g., "Deep Cleaning"), the system activates a "Geo-Proximity Matching Algorithm." It scans for active helpers within a 2km radius of the user's live location.
- **Step 2: Instant Allocation:** The algorithm filters candidates based on their real-time "Available" status and instantly locks the nearest professional. This automation removes manual dispatch delays.
- **Step 3: Real-Time Confirmation:** The system generates a unique Booking ID and displays the "Estimated Arrival Time" (e.g., "Arriving in 12 mins") immediately.

## 3. Key Features
- **One-Tap Booking Engine:** Simplified flow allowing users to book without lengthy forms.
- **Dynamic Dashboard:** A personalized space for users to track active bookings and view service history.
- **Service Categorization:** Clear, icon-based segmentation for quick navigation.
- **Instant ETA:** Real-time calculation of arrival time based on the assigned helper's distance.

## 4. Technology Stack
- **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+).
- **Core Logic:** DOM Manipulation for accurate status updates.
- **Data & Storage:** Local Storage for persistent user bookings and helper data.
- **Tools:** VS Code, GitHub, Netlify.
