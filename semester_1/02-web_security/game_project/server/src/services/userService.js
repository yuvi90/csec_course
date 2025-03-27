// Client
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const userService = {
  // Creating New User
  registerUser: async (user) => {
    const result = await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
    return result;
  },

  // Get User by Username
  getUserByUsername: async (username) => {
    const result = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return result;
  },

  // Get User by Email
  getUserByEmail: async (email) => {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return result;
  },
};

export default userService;
