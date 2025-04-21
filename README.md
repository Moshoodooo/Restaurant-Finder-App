# 📱 Restaurant Finder App - Full Stack Assessment

A mobile-friendly, location-based restaurant discovery application built with **React Native (Expo)** for the frontend and **ExpressJS + PostgreSQL** for the backend (partially implemented). This project was developed for the Full Stack Mobile Developer assessment at **Kenkeputa**.

---

## 🚀 Tech Stack

### Frontend

- **React Native (Expo) + Expo Go**
- **expo-router** for file-based routing
- **Foursquare API** for restaurant discovery
- **OpenCage API** for reverse geocoding
- **React Navigation** for in-app navigation

### Backend *(Partially Implemented)*

- **ExpressJS** with **PostgreSQL**
- Docker-based infrastructure
- Basic route scaffolding, login stub only

---

## 📲 Core Features Implemented

- 🌍 **Geolocation**-based restaurant listing
- 🔎 **Search** for restaurants by name
- 🗂️ Basic **Search screen** filters available restaurants
- 📍 Google Maps integration for user's location
- 📘 Restaurant **details** page with contact, rating, amenities
- 👤 User **Register** and **Profile** screens designed (not connected)
- 💾 Hardcoded **authentication** for testing

---

## 🛠️ How to Run

### 1. Prerequisites

- Install Expo Go on your mobile device
- Install dependencies:

```bash
npm install
```

- Start the app:

```bash
npx expo start
```

- Scan QR with Expo Go to launch on your mobile

### 2. Login Credentials

> These are **hardcoded** for demonstration purposes due to backend limitations:

```
Email:    user@example.com
Password: password
```

---

## 🧠 Architectural Decisions

- Chose **Expo Router** for scalable navigation
- Integrated **Foursquare** for reliable restaurant data
- Separated views into clear pages: `login`, `home`, `restaurant`, `details`, `search`, `register`, `profile`
- Utilized `AsyncStorage` to simulate token-based login flow

---

## ⚠️ Known Limitations

- Backend is not yet fully integrated
- Register/Profile pages not wired to backend
- Login is mock-only
- No cuisine or price filters yet
- No user favorites/profile management

---

## 🌱 Future Improvements

- ✅ Full backend implementation with PostgreSQL
- 🔐 JWT-based auth + user registration
- 🗂️ Implement cuisine & price filters
- ❤️ User favorites & saved restaurants
- 🔍 Advanced search with tags and location radius
- 🧪 Unit and integration testing

---

## 📎 Submission

Please find this repository at: [🔗 https://github.com/Moshoodooo/Restaurant-Finder-App.git]

For any inquiries or support, feel free to reach out.

---

**Submitted by:** Moshood Oyeniran  
[Email: moshoodoyeniran09@gmail.com](mailto:moshoodoyeniran09@gmail.com)

