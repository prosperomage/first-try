import { User } from "../models/user.models.js";

const RegisterUser = async (req, res) => {
  try {
    const { username, email, passsword } = req.body;
    //basic validation
    if (!username) {
      return res.status(400).json({ message: "all fields should be filled" });
    }

    //check if user exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "user already exists" });
    }

    //create a user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      passsword,
      loggeedIn: false,
    });
    res.status(201).json({
      message: "user has been created",
      user: { id: user._id, email: user.email, username: user.username },
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

    const user = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    //compare the passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400)({ message: "invalid credentials" });

    res.status(200)({
      message: "user logged in",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500)({ message: "internal server error", error });
  }
};

const logoutUser = async (req, res) => {
  try {
    // get the req from the client

    const { email } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user)
      return res.status(400).json({ message: "user cannot be logged out" });

    res.status(200).json({
      message: "logged out successfully ",
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error",error });
  }
};

export { RegisterUser, loginUser, logoutUser };
