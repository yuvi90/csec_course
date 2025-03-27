import bcrypt from "bcrypt";
import validator from "validator";
import userService from "../services/userService.js";

const AuthController = {
  // Register New User
  registerUser: async (req, res, next) => {
    const { firstName, lastName, username, email, password } = req.body;

    try {
      // Check username and password presence
      if (!firstName || !lastName || !username || !email || !password) {
        return res.status(400).json({ status: false, message: "Incomplete fields!" });
      }

      // Check for valid email
      if (!validator.isEmail(email)) {
        return res.status(400).json({ status: false, message: "Provide valid email!" });
      }

      // Check for duplicate username or email
      const duplicateUser = await userService.getUserByUsername(username);
      const duplicateEmail = await userService.getUserByEmail(email);

      if (duplicateUser || duplicateEmail) {
        return res.status(409).json({ status: false, message: "User already exists!" });
      }

      // Encrypt Password
      const hashedPwd = await bcrypt.hash(password, 12);

      // Create and store new user
      const result = await userService.registerUser({
        firstName,
        lastName,
        username,
        email,
        password: hashedPwd,
      });

      // Send Response
      if (result) {
        return res.status(201).json({
          status: true,
          message: "New user created!",
        });
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
