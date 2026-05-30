# Smart Event Registration Portal

## Overview

The Smart Event Registration Portal is a full-stack web application designed to simplify event management and participant registration. The platform allows users to browse events, register online, generate QR-based tickets, and manage registrations. Administrators can create and manage events, monitor registrations, and analyze event participation through an analytics dashboard.

## Features

### User Features

* User Registration and Login
* Secure JWT Authentication
* Browse Available Events
* Register for Events
* View Registered Events
* QR Code-Based Ticket Generation
* Dark Mode Support
* User Dashboard

### Admin Features

* Admin Login
* Create Events
* Delete Events
* View Event Registrations
* Analytics Dashboard
* CSV Export of Registration Data

### Additional Features

* MongoDB Atlas Cloud Database
* Responsive User Interface
* Real-Time Registration Tracking
* Seat Availability Management
* Registration Count Tracking

## Technologies Used

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* QRCode React

### Backend

* Node.js
* Express.js
* JWT Authentication
* Nodemailer

### Database

* MongoDB Atlas
* Mongoose

## Project Structure

```text
smart-event-portal/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/chsaivikasreddy/smart-event-portal.git
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Environment Variables

Create a `.env` file inside the server folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
PORT=5000
```

## Future Enhancements

* Event Search
* Category Filtering
* Email Confirmation Verification
* Event Editing
* Registration Cancellation
* Event Notifications

## Project Outcome

The Smart Event Registration Portal automates event registration and management by providing a secure, responsive, and user-friendly platform. It improves participant tracking, event administration, and overall event management efficiency through modern web technologies.

## Author

**Sai Vikas Reddy**

GitHub: https://github.com/chsaivikasreddy
