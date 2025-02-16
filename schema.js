const { gql } = require("apollo-server-express");

const schema = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        created_at: String!
        updated_at: String!
    }

    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
        created_at: String!
        updated_at: String!
    }

    type Query {
        login(username: String, email: String, password: String!): String
        currentUser: User
        getAllEmployees: [Employee]
        getEmployeeById(id: ID!): Employee
        getEmployeesByDesignationOrDepartment(designation: String, department: String): [Employee]
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): User
        addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, designation: String!, salary: Float!, date_of_joining: String!, department: String!): Employee
        updateEmployee(id: ID!, first_name: String, last_name: String, email: String, gender: String, designation: String, salary: Float, date_of_joining: String, department: String): Employee
        deleteEmployee(id: ID!): String
        logout: String
    }
`;

module.exports = schema;
