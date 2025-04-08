# CG Forms 📝  
A full-stack Google Forms alternative for creating, managing, and sharing forms with real-time response tracking and user authentication.

![Screenshot from 2025-04-08 19-00-19](https://github.com/user-attachments/assets/6344adc4-7ce0-4f8c-8869-4ab864cacfa9)

## 🚀 Overview

**CG Forms** is a modern and fully responsive web application that enables users to:

- 🔐 Authenticate securely using Google via Firebase
- ✍️ Create custom forms similar to Google Forms with multiple input types
- ⏳ Set form expiration rules (based on time or usage)
- 📬 Share forms via unique URLs
- 📊 View collected responses in a clean, structured, tabular format
- 📱 Access the app seamlessly from any device

It is built with a scalable architecture using modern tools and technologies, including React, Tailwind CSS, Firebase Auth, MongoDB, and Express.

---

## ✨ Features

- **Google Login Authentication** — Powered by Firebase Auth for secure and quick access.
- **Dynamic Form Builder** — Create various form fields:
  - Text input (e.g., name, description)
  - Number-only fields
  - Multiple Choice Questions (MCQs)
  - More types in development...
- **Form Expiry Settings** — Set an expiration date or link validity time for form availability.
- **Dashboard View** — After creation, users can view all their forms in a personalized dashboard.
- **Response Management** — Submissions are stored and shown in an organized table for easy analysis.
- **Device Responsive** — Fully optimized UI/UX for mobile, tablet, and desktop screens.
- **RESTful API Integration** — Form data and responses handled through a robust Node.js and Express backend.

---

## 🧰 Tech Stack

| Tech         | Role                                |
|--------------|-------------------------------------|
| React.js     | Frontend Framework                  |
| Tailwind CSS | Responsive UI Styling               |
| Firebase     | Authentication (Google Sign-In)     |
| MongoDB      | Database for storing forms & responses |
| Express.js   | Backend server handling REST API    |
| Node.js      | Runtime environment for server logic |

---

## 📸 Screenshots & Demos

![Screenshot from 2025-04-08 19-01-48](https://github.com/user-attachments/assets/53e86897-9407-47f5-a4be-5f87b0bd5c65)
![cg-forms vercel app_create-form](https://github.com/user-attachments/assets/9bd12b34-66c9-4435-845b-4a41d88b526a)
![Screenshot from 2025-04-08 19-11-49](https://github.com/user-attachments/assets/4d9986f3-b820-4285-a260-407502a52e8a)

- [ ] Home / Landing Page
- [ ] Form Builder Interface
- [ ] Dashboard View
- [ ] Form Response Table
- [ ] Mobile Responsiveness Showcase

---

## 🔒 Authentication

- Integrated **Firebase Authentication**
- Only authenticated users can create and manage forms.
- Each user's forms and responses are private and accessible only to them.

---

## 📁 Project Structure (Brief)

