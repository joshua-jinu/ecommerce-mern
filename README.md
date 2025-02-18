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

1. **Milestone 1**- Added README file
2. **Milestone 2**
   - created frontend using vite
   - added and configured tailwind css
   - created backend file structure
3. **Milestone 3**
   - added express, mongoose, nodemon, dotenv
   - created .env file with credentials and port
   - created an express server
   - connected to MongoDB cluster
4. **Milestone 4: Creating User Model and Controller that summarizes what was achieved in this milestone.**
   - added User model
   - Added user controller
   - Configured and enabled multer for uploads
5. **Milestone 5:**
   - added Routing to /signup & /login
   - created validation object using RegEx
   - added Form validation
6. **Milestone 6:**
   - added nodemailer
   - created transporter function for sending mails
   - sent email using transporter function
   - generate token for each create-user POST request
   - created verify user function using JWT
   - create endpoint to authenticate user and return response
7. **Milestone 7:**
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
8. **Milestone 8:**
   - Added Card component in frontend.
   - Added flexbox layout in homepage to show all product cards in a responsive manner.
   - Mapped dummy product data to Card component in Home.jsx.
9. **Milestone 9:**
   - Created the form for the products with the required fields
   - form with product title, description, stock, price, discounted price, category and rating
10. **Milestone 10:**
    - Added Product Schema with validation
    - created /create-product endpoint for CRUD operations for products
    - Handled image uploads using cloudinary and multer
11. Milestone 11:
    - Created endpoint to fetch products
    - created controller to handle get request at /product/get-products
12. Milestone 12:
    - fetched product data from database using axios get request to backend api url
    - mapped the products data dynamically using card component
13. Milestone 13:
    - PUT endpoint to update the products
    - Frontenv form with pre-filled data to update the products
    - handle submit for product update form with axios
    - Added update button to product card
14. Milestone 14:
    - added delete endpoint in backend
    - added delete button to product card
    - handleDelete which deletes the product and displays the updated products
15. Milestone 15:
    - added NavBar
16. Milestone 16:
    - added Single Product Page
    - added Image Modal
    - added JWT verify middleware
    - added useremail to product schema
    - updated login and signup controllers
    - added middlewares to handle singup and login functionality
17. Milestone 17:
    - Created Cart Schema
    - Created Cart Model and Controller
    - Created add products and get products endpoint for Cart
    - add products to cart from frontend
18. Milestone 18:
    - created endpoint.
    - created cart page to view cart items.
19. Milestone 19:
    - Created cart card
    - featched cart data and displayed it on the frontend
20. Milestone 20:
    - Created profile component
21. Milestone 21:
    - Created Address Form component
22. Milestone 22:
    - updated address form to send data to backend api
    - created endpoint to handle address form data
    - created address deletion endpoint
23. Milestone 23:
    - added checkout from cart
    - added get-addresess endpoint in cart
    - added select addresses page
24. Milestone 24:
    - added Order confirmation
    - displayed products in order confirmation
    - displayed selected address in order confirmation page using localStorage
25. Milestone 25:
    - added backend endpoint to confirm order
    - created order database
    - created order router, model and controller
26. Milestone 26:
    - added /user-order-details backend route and controller to fetch the orders of the user
27. Milestone 27:
    - added order confirmation page
    - modified backend endpoint to confirm order
    - created order history page
28. Milestone 28:
    - displayed orders in order history page
    - created cancel order route
29. Milestone 29:
    - created razorpay payment gateway backend endpoints
30. Milestone 30:
    - integrated razorpay payment gateway in frontend
31. Milestone 31:
    - added redux
32. Milestone 32:
    - accessed redux user state in each page
33. Milestone 33:
    - set access token in cookies with httpOnly Secure flags for improved security
