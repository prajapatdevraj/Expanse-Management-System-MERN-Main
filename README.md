# Expanse-Management-System-MERN-Main
Expense Management System, built using MERN stack, lets you effortlessly manage expenses. With React frontend and Express backend, it ensures secure user interactions, insightful data visualization, and easy transaction handling
# Expense Management System (MERN)
This project is a comprehensive Note Expense Management System developed using the MERN stack, consisting of MongoDB, Express, React, and Node.js.

# Project Structure
Root Folder: Contains Node.js backend code.
Client Folder: Houses the React frontend code.
# Getting Started
Starting the Server: Run the command npm run server in the root directory.
Environment Variables: Utilize the .env file to store sensitive credentials like PORT and mongoUrl accessed via process.env.<VARIABLE_NAME>.
MongoDB Connection: Install Mongoose using npm i mongoose to establish a connection to MongoDB. The connectDb file manages the connection using mongoose and the mongoURL.
User Data Schema: Designed the schema for user data including name, email, and password in the userModels.
Routing: Created userRoutes using Express for handling user-related operations like login and registration.
React App Setup: Created the React app in the client folder using npx create-react-app and installed necessary packages (axios, react-router-dom, redux, react-redux).
# Frontend Development
Integrated Bootstrap into the application for styling.
Implemented various components such as Footer, Header, Layout, and Homepage.
Incorporated Ant Design for enhanced UI components and forms.
Configured routes using BrowserRouter and applied protected routes for authenticated access.
Added a spinner component for better user experience during data fetching.
# Backend Development
Established transaction-related routes, models, and controllers similar to user operations.
Implemented CRUD functionalities for transactions including creation, retrieval, updating, and deletion.
Integrated moment library for handling date-related operations in both frontend and backend.
# Data Visualization and Analysis
Implemented tables and charts using Ant Design and Progress to display transaction and turnover data.
Conducted mathematical calculations on transaction data for analytics.
Categorized data for better visualization based on different parameters.
# Additional Features
Designed an action section for editing and deleting transactions.
Incorporated icons and implemented functionality for editing and deleting transactions.
