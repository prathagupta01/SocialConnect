# SocialConnect

SocialConnect is a dynamic, full-featured blogging platform built using the MERN stack. It is designed to facilitate seamless content sharing and interactive user engagement through a modern, responsive interface.

## 🚀 Features
User Authentication: Secure signup and login functionality for personalized user experiences.<br>
Content Management: Full CRUD (Create, Read, Update, Delete) capabilities for blog posts.<br>
Interactive UI: A responsive frontend built with React to ensure smooth navigation across devices.<br>
Scalable Backend: Optimized API endpoints for efficient data retrieval and storage.<br>
Data Persistence: Managed with MongoDB to store user profiles and blog content reliably.<br>

## 🛠️ Tech Stack

Frontend: React.js, HTML5, CSS3.<br>
Backend: Node.js, Express.js.<br>
Database: MongoDB.<br>
Tools: Git, GitHub for version control.<br>

## 📂 Project Structure
SocialConnect/<br>
├── client/          # React frontend components and assets<br>
├── server/          # Node.js/Express backend logic and routes<br>
├── models/          # MongoDB schemas for users and posts<br>
├── middleware/      # Authentication and error handling<br>
└── .env             # Environment variables<br>


## 🔧 Installation & Setup
Clone the repository:<br>

Bash<br>
git clone https://github.com/prathagupta01/SocialConnect.git<br>
Install Client Dependencies:<br>

Bash<br>
cd client && npm install<br>
Install Server Dependencies:<br>

Bash<br>
cd ../server && npm install<br>
Environment Setup:<br>
Create a .env file in the server directory and add your MONGODB_URI and JWT_SECRET.<br>

Run the Application:<br>
Start Server: npm start (within server folder)<br>
Start Client: npm start (within client folder)<br>

## 📈 Future Enhancements
Comment System: Adding real-time user comments on blog posts.<br>
Search & Filter: Implementing search functionality to find posts by tags or categories.<br>
Image Uploads: Integrating cloud storage (like Cloudinary) for post images.<br>
