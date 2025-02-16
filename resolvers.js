const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Employee = require("./models/Employee");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");

const resolvers = {
  Query: {
    login: async (_, { username, email, password }) => {
      try {
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
          throw new Error("User not found");
        }
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return "Login successful";
      } catch (error) {
        console.error("Login error:", error);
        throw new Error("Error during login: " + error.message);
      }
    },

    currentUser: async (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }
      return await User.findById(req.session.userId);
    },

    getAllEmployees: async () => {
      return await Employee.find();
    },
    getEmployeeById: async (_, { id }) => {
      try {
        const employeeId = new mongoose.Types.ObjectId(id);

        const employee = await Employee.findById(employeeId);
        if (!employee) {
          throw new Error("Employee not found");
        }
        return employee;
      } catch (error) {
        console.error("Error finding employee:", error);
        throw error;
      }
    },

    getEmployeesByDesignationOrDepartment: async (
      _,
      { designation, department }
    ) => {
      const filter = {};
      if (designation) filter.designation = designation;
      if (department) filter.department = department;
      return await Employee.find(filter);
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const errors = [];
      if (!username || username.length < 3) {
        errors.push("Username is required and must be at least 3 characters");
      }
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        errors.push("Please provide a valid email address");
      }
      if (!password || password.length < 6) {
        errors.push("Password is required and must be at least 6 characters");
      }

      if (errors.length === 0) {
        const existingUser = await User.findOne({
          $or: [{ username }, { email }],
        });
        if (existingUser) {
          errors.push("User with this username or email already exists");
        }
      }

      if (errors.length > 0) {
        throw new Error(`Validation error: ${errors.join(", ")}`);
      }
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        });

        await newUser.save();

        return {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          created_at: newUser.created_at,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Error creating user: " + error.message);
      }
    },

    addEmployee: async (
      _,
      {
        first_name,
        last_name,
        email,
        gender,
        designation,
        salary,
        date_of_joining,
        department,
      }
    ) => {
      const errors = [];
      if (!first_name) errors.push("First name is required");
      if (!last_name) errors.push("Last name is required");
      if (!email || !/^\S+@\S+\.\S+$/.test(email))
        errors.push("Please provide a valid email address");
      if (!salary || isNaN(salary) || salary < 1000)
        errors.push("Salary must be a number greater than or equal to 1000");
      if (!date_of_joining || isNaN(Date.parse(date_of_joining)))
        errors.push("Please provide a valid date for joining");
      if (!department) errors.push("Department is required");

      if (errors.length > 0) {
        throw new Error(`Validation error: ${errors.join(", ")}`);
      }

      const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        gender,
        designation,
        salary,
        date_of_joining,
        department,
      });

      await newEmployee.save();
      return newEmployee;
    },

    updateEmployee: async (_, { id, ...updates }) => {
      const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, {
        new: true,
      });
      return updatedEmployee;
    },

    deleteEmployee: async (_, { id }) => {
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      return "Employee deleted successfullt.";
    },

    logout: async (_, __, { req }) => {
      req.session.destroy();
      return "Logged out successfully";
    },
  },
};

module.exports = resolvers;
