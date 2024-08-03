// src/controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signUp = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  res.status(201).json({message: 'User Created'});
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid Credentials');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid Credentials');

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  console.log("Generated Token: ", token);
  res.status(200).json({ token, role: user.role });
};
