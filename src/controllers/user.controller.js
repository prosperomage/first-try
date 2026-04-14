// import { User } from "../models/user.models.js";

import { prisma } from "../lib/prisma.js";

const RegisterUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    //basic validation
    if (!firstName) {
      return res.status(400).json({ message: "all fields should be filled" });
    }

    //check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
     
    }
   

    // 2. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Save to MySQL
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });
      console.log('user has been registered')
    res.status(201).json({
      message: "User created successfully",
      user: { id: user.id, firstName: user.firstName },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "user cant be registered", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    //check if the user exists
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare the plain-text password with the hash in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Success! Send user info back
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
      console.log('user has been logged in')
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

const logoutUser = async (req, res) => {
  try {
    // get the req from the client

    const { email } = req.body;

  
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "logged out successfully ",
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

export { RegisterUser, loginUser, logoutUser };
