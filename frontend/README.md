Teacher Management System
A full-stack web application for managing teacher information with JWT authentication, built with CodeIgniter (PHP backend) and React (frontend).

Features
User Authentication: Register and login with JWT tokens

Teacher Management: Add and view teacher information

Protected Routes: API endpoints secured with JWT authentication

Responsive Design: Built with React Bootstrap for mobile-friendly UI

Technology Stack
Backend
CodeIgniter 3.x

PHP 7.4+

MySQL/MariaDB

Firebase JWT for token handling

Frontend
React 18.x

React Router DOM for navigation

React Bootstrap for UI components

Axios for API calls

Installation Guide
Prerequisites
PHP 7.4 or higher

MySQL 5.7 or higher

Composer

Backend Setup (CodeIgniter)
Navigate to the backend directory:

bash
cd backend
Install dependencies:

bash
composer install
Set up the database:

Create a MySQL database named teacher_management
Usage
Access the application: Open http://localhost:3000 in your browser

Register a new account:

Click on "Register" in the navigation

Fill in the registration form

Submit to create your account

Login:

Use your credentials to log in

Upon successful login, you'll receive a JWT token

Add a teacher:

Navigate to "Add Teacher" from the navigation

Fill in the teacher details form

Submit to create a new teacher record

View teachers:

Navigate to "Teachers" to see all teacher records

The data comes from both auth_user and teachers tables

API Endpoints
Authentication Endpoints
POST /api/register - Register a new user

POST /api/login - Login and receive JWT token

GET /api/verify - Verify JWT token

Teacher Endpoints (Protected)
GET /api/teachers - Get all teachers

POST /api/teachers/create - Create a new teacher