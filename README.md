# Quick Serve: The 15-Minute Home Service Promise

**Regn.no:** 12309902 Vignesh Reddy  
**Regn.no:** 12306984 J Mohan Abhishek Gupta  

**Problem Statement ID:** Problem Statement 7  
**Problem Title:** Instant Service Booking System  

## 1. Our Idea
We built Quick Serve because we noticed a gap in how home services work. When you need a plumber or cleaner right now, the usual process involves too much waiting and negotiating. We wanted to build a web platform that works more like quick-commerce apps (like Blinkit or Zepto), but for services. Our primary goal is simple: to keep a strict "15-Minute Service Promise." We focused on cutting out the wait time by checking who is available right then, assigning the job automatically, and showing exactly when they will arrive.

## 2. Proposed Approach
To actually hit that 15-minute goal, we had to design a very specific flow. Here is how our 3-step logic works under the hood:
- **Step 1: Smart Geo-Fencing:** When a user selects a service like "Deep Cleaning," the platform immediately checks for active workers within a close distance (e.g., a 2km radius) of their location.
- **Step 2: Instant Allocation:** Instead of waiting for manual dispatch or for workers to bid on a job, our code automatically filters for who is currently signed in and available, and assigns the closest person. 
- **Step 3: Real-Time Confirmation:** Once assigned, the system creates a unique Booking ID and shows a live "Estimated Arrival Time" (like "Arriving in 12 mins") so the user knows help is actively on the way.

## 3. Key Features
- **One-Tap Booking Engine:** We kept the booking process as straightforward as possible. No long forms to fill out.
- **Dynamic Dashboard:** Users have their own space to track current and past bookings.
- **Service Categorization:** We set up clear, easy-to-read categories with icons so users can find what they need quickly.
- **Instant ETA:** We calculate arrival times using the distance between the user and the assigned helper to keep it realistic.

## 4. Technology Stack
- **Frontend:** React.js and Vite (to keep things fast and component-based).
- **Styling:** CSS3 (Flexbox/Grid) for a custom, clean layout without heavy frontend frameworks.
- **Data & Storage:** Local Storage API. We used this to simulate a database so we could build a fast, zero-latency prototype for the hackathon without needing a full backend server.
- **Tools & Deployment:** VS Code, GitHub, and Netlify for tracking work and hosting the live site.
