# Employee Management System (GraphQL Backend)

## Overview

This is a backend application for managing employees using **Node.js**, **Express**, **GraphQL**, and **MongoDB**. It supports user authentication and CRUD operations for employees.

## Features

- **User Authentication** (Signup, Login, Logout)
- **Employee Management** (Add, Update, Delete, Retrieve Employees)
- **GraphQL API** with Query Filtering
- **Data Validation**
- **MongoDB for Data Storage**

## Technologies Used

- Node.js
- Express.js
- GraphQL
- MongoDB (Mongoose ORM)
- bcrypt.js (Password Hashing)
- express-validator (Validation)
- Postman (API Testing)

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or later)
- **MongoDB** (Local or Cloud Database)

### Steps to Set Up

1. **Clone the repository:**
   ```sh
   git clone https://github.com/dorpanz/101431121_COMP3133_101431121_Assignment1.git
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the server:**
   ```sh
   npm start
   ```
   The server should run at `http://localhost:4000/graphql`

## GraphQL API Usage

### Queries

#### 1. Login

```graphql
query {
  login(username: "testuser", email: "test@example.com", password: "password123")
}
```

#### 2. Get All Employees

```graphql
query {
  getAllEmployees {
    id
    first_name
    last_name
    email
    designation
    department
  }
}
```

#### 3. Get Employee by ID

```graphql
query {
  getEmployeeById(id: "65a8b7e2c3f1e2a0b8d7f3a1") {
    id
    first_name
    last_name
    email
  }
}
```

### Mutations

#### 1. Signup

```graphql
mutation {
  signup(username: "newuser", email: "newuser@example.com", password: "securepass") {
    id
    username
    email
  }
}
```

#### 2. Add Employee

```graphql
mutation {
  addEmployee(
    first_name: "John"
    last_name: "Doe"
    email: "johndoe@example.com"
    gender: "Male"
    designation: "Software Engineer"
    salary: 5000
    date_of_joining: "2024-02-15"
    department: "IT"
  ) {
    id
    first_name
    last_name
  }
}
```

#### 3. Delete Employee

```graphql
mutation {
  deleteEmployee(id: "65a8b7e2c3f1e2a0b8d7f3a1") {
    id
    first_name
  }
}
```

## Testing with Postman

1. Open **Postman**
2. Set **Request Type** to `POST`
3. Set **URL** to:
   ```
   http://localhost:4000/graphql
   ```
4. Go to the `Body` tab and select **GraphQL**
5. Enter your queries/mutations and click **Send**

## License

This project is licensed under the MIT License.

Daria Ignateva 101431121

