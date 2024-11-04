 

# Node.js Authentication API

## Overview
This project is a comprehensive user authentication API built with Node.js, Express, and MongoDB. It provides secure and efficient user sign-up, login, email verification, password recovery, and authentication token validation. The project is designed with a RESTful approach, following industry standards for security and modularity, making it easy to integrate into various applications.

## Project Description
The Node.js Authentication API is built to handle secure user management and authentication processes, focusing on providing a robust and scalable solution for application authentication. It includes:
- User registration (sign-up) with email and password.
- Authentication and session management with JSON Web Tokens (JWT).
- Email verification to validate user accounts.
- Password reset options with token-based recovery.
- Secure routes for authenticated access, preventing unauthorized access.

## Features
- **User Sign-Up**: Allows users to create an account by providing a unique email and password.
- **Login/Logout**: Supports secure login and logout using JWT for session management.
- **Email Verification**: Validates user emails to prevent unauthorized access.
- **Forgot Password**: Enables users to reset their password securely.
- **Auth Check**: Verifies if a user is authenticated and has access.
- **Error Handling**: Comprehensive error messages for debugging and user notifications.
  
## Project Structure

```
contact-manager-backend/
├── controllers/ # Route handlers
├── middlewares/ # Custom middleware functions
├── models/ # Mongoose models
├── routes/ # API routes
├── utils/ # Utility functions
├── .env # Environment variables
├── .gitignore # Files to ignore in git
├── package.json # npm package configuration
├── README.md # Project documentation
└── server.js # Entry point for the application

## Prerequisites

Before you begin, ensure you have the following installed:

| Software | Description                                                                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Node.js  | Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript code on the server side. [Download Node.js](https://nodejs.org/) |
| npm      | npm is the package manager for Node.js, used to install and manage dependencies for your project. It is included with Node.js installation.                              |
| MongoDB  | MongoDB is a NoSQL database program that uses JSON-like documents with optional schemas. [Download MongoDB](https://www.mongodb.com/)   


## Installation and Setup

1. Clone the repository: `git clone <repository-url>`

## Install dependencies:

   ```bash
   npm install
   ```

## Set up environment variables:

Create a `.env` file in the root directory and add the following:

```bash
   MONGO_URI=<your_mongo_db_uri>
   JWT_SECRET=<your_jwt_secret_key>
   NODE_ENV = <EnvermenT>
   MAIL_TRAP_TOKEN=<your_mailTrap_secret_key>
    
```

## Running the Application

   ```bash
  npm run dev
   ```
 
The API will be accessible at http://localhost:3000.

## API Endpoints

#### Auth

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/v1/auth/signup` | Register a new user    |
| POST   | `/api/v1/auth/login`    | Login an existing user |
| POST   | `/api/v1/auth/verify-email`    | User verifies Email|
| POST   | `/api/v1/auth/forget-password`    | Forget Password by sending an Email|
| POST   | `/api/v1/auth//reset-password/:token` |Reset User Password |
| POST   | `/api/v1/auth/logout` |User Logout |
| POST   | `/api/v1/auth/check-auth` |Chek User Auth  |


## Routes
Below are the API endpoints and their functions, along with the expected request and response structures.

### 1. `POST /signup`
- **Description**: Registers a new user with an email and password.
- **Request**:
  ```json
  {  
    "name": "user"
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Response**:
  - Success: `201 Created`
    ```json
    {
      "message": "User created successfully. Please verify your email."
    }
    ```
  - Error: `400 Bad Request`
    ```json
    {
      "error": "Email already exists."
    }
    ```

### 2. `POST /login`
- **Description**: Authenticates an existing user.
- **Request**:
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Response**:
  - Success: `200 OK`
    ```json
    {
      "message": "Login successful",
      "token": "JWT_TOKEN_HERE"
    }
    ```
  - Error: `401 Unauthorized`
    ```json
    {
      "error": "Invalid email or password."
    }
    ```

### 3. `GET /check-auth`
- **Description**: Checks if a user is authenticated.
- **Request**: Headers should include a valid JWT token.
- **Response**:
  - Success: `200 OK`
    ```json
    {
      "message": "User is authenticated."
    }
    ```
  - Error: `401 Unauthorized`
    ```json
    {
      "error": "Invalid or missing token."
    }
    ```

### 4. `POST /logout`
- **Description**: Logs out the user by invalidating the token.
- **Request**: Headers should include a valid JWT token.
- **Response**:
  - Success: `200 OK`
    ```json
    {
      "message": "Logout successful."
    }
    ```
  - Error: `400 Bad Request`
    ```json
    {
      "error": "Unable to log out."
    }
    ```

### 5. `POST /verify-email`
- **Description**: Verifies a user's email address after sign-up.
- **Request**:
  ```json
  {
    "emailToken": "EMAIL_VERIFICATION_TOKEN"
  }
  ```
- **Response**:
  - Success: `200 OK`
    ```json
    {
      "message": "Email verified successfully."
    }
    ```
  - Error: `400 Bad Request`
    ```json
    {
      "error": "Invalid or expired email verification token."
    }
    ```

### 6. `POST /forget-password`
- **Description**: Initiates password reset by sending a token to the user's email.
- **Request**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response**:
  - Success: `200 OK`
    ```json
    {
      "message": "Password reset link sent to your email."
    }
    ```
  - Error: `400 Bad Request`
    ```json
    {
      "error": "Email not found."
    }
    ```

### 7. `POST /reset-password/:token`
- **Description**: Resets the user password using a valid reset token.
- **Request**:
  ```json
  {
    "newPassword": "newuserpassword"
  }
  ```
- **Response**:
  - Success: `200 OK`
    ```json
    {
      "message": "Password reset successfully."
    }
    ```
  - Error: `400 Bad Request`
    ```json
    {
      "error": "Invalid or expired reset token."
    }
    ```



## Technologies Used
- **Node.js**: For the backend server.
- **Express**: As the web framework.
- **MongoDB**: For the database.
- **JWT**: For secure user authentication and session management.

## Contributing
Feel free to open issues and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is open-source and available under the [MIT License](LICENSE).

