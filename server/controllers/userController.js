import Directory from "../models/directoryModel.js";
import User from "../models/userModel.js";
import mongoose, { Types } from "mongoose";
import crypto from "node:crypto";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const hasedPassword = crypto.createHash("sha-256").update(password).digest("base64url");

  try {
    const rootDirId = new Types.ObjectId();
    const userId = new Types.ObjectId();

    await Directory.create({
      _id: rootDirId,
      name: `root-${email}`,
      parentDirId: null,
      userId,
    });

    await User.create({
      _id: userId,
      name,
      email,
      password:hasedPassword,
      rootDirId,
    });

    res.status(201).json({ message: "User Registered" });
  } catch (err) {
    if (err.code === 121) {
      res
        .status(400)
        .json({ error: "Invalid input, please enter valid details" });
    } else if (err.code === 11000) {
      if (err.keyValue.email) {
        return res.status(409).json({
          error: "This email already exists",
          message:
            "A user with this email address already exists. Please try logging in or use a different email.",
        });
      }
    } else {
      next(err);
    }
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if(!user) {
    return res.status(404).json({ error: "Invalid Credentials" });
  }

  const enterdPasswordHash = crypto.createHash("sha-256").update(password).digest("base64url");
  
  console.log(enterdPasswordHash);
  if (user.password !== enterdPasswordHash) {
    return res.status(404).json({ error: "Invalid Credentials" });
  }
  res.cookie("uid", user._id.toString(), {
    httpOnly: true,
    maxAge: 60 * 1000 * 60 * 24 * 7,
  });
  res.json({ message: "logged in" });
};

export const getCurrentUser = (req, res) => {
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
  });
};

export const logout = (req, res) => {
  res.clearCookie("uid");
  res.status(204).end();
};
