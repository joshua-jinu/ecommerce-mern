# MERN E-Commerce Platform

## Overview

Full-stack e-commerce web application built with MERN stack.

## Features

- User authentication
- Product browsing
- Shopping cart
- Responsive design

## Tech Stack

- Frontend: React, Redux
- Backend: Node.js, Express
- Database: MongoDB, PostgreSQL
- Styling: Tailwind CSS

## Setup

1. Clone repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Create .env files
4. Run development servers
   ```bash
   npm run dev
   ```

## Project Structure

```
mern-ecommerce/
├── backend/
├── frontend/
└── README.md
```

## Getting Started

1. Clone the repo
2. Install dependencies
3. Configure environment variables
4. Run the application

## Milestones

1. Added README file
2. Milestone 2
   - created frontend using vite
   - added and configured tailwind css
   - created backend file structure
3. Milestone 3
   - added express, mongoose, nodemon, dotenv
   - created .env file with credentials and port
   - created an express server
   - connected to MongoDB cluster
4. Milestone 4: Creating User Model and Controller that summarizes what was achieved in this milestone.
   - added User model
   - Added user controller
   - Configured and enabled multer for uploads
5. Milestone 5:
   - added Routing to /signup & /login
   - created validation object using RegEx
   - added Form validation
6. Milestone 6:
   - added nodemailer
   - created transporter function for sending mails
   - sent email using transporter function
   - generate token for each create-user POST request
   - created verify user function using JWT
   - create endpoint to authenticate user and return response
7. Milestone 7:
   - Created /signup and /login endpoints
   - Signup functionality
     - accept data from req.body
     - return response with message that the user us already present if the email is already there in the db.
     - if the user is not there, hash the password using bcrypt and create a user in the db with the name, email and the hashed password.
   - Login functionality
     - if the user is not present, return response saying the user is not present
     - if the user is present, authenticate the password using brcypt.compare
       - if password is incorrect, return error response message
       - if the password is correct, create token and authenticate the user. add the token to the cookies so that the user stays logged in.
8. Milestone 8:
   - Added Card component in frontend.
   - Added flexbox layout in homepage to show all product cards in a responsive manner.
   - Mapped dummy product data to Card component in Home.jsx.
9. Milestone 9:
   - Created the form for the products with the required fields
   - form with product title, description, stock, price, discounted price, category and rating
10. Milestone 10:
    - Added Product Schema with validation
    - created /create-product endpoint for CRUD operations for products
    - Handled image uploads using cloudinary and multer
