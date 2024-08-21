import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, findUserByPhone } from '../models/userModel.js';

dotenv.config();

// Simulate OTP generation
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Register a new user
export async function register(req, res) {
  const { name, phone } = req.body;

  const existingUser = await findUserByPhone(phone);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = {
    name,
    phone,
    createdAt: new Date(),
  };

  await createUser(user);
  res.status(201).json({ message: 'User registered successfully' });
}

// Login and generate OTP
export async function login(req, res) {
  const { phone } = req.body;

  const user = await findUserByPhone(phone);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const otp = generateOTP();
  console.log(`OTP for phone ${phone}: ${otp}`);

  // In a real application, send OTP to the user's phone number
  res.status(200).json({ message: 'OTP sent to your phone number' });
}

// Verify OTP and generate JWT
// export function verifyOTP(req, res) {
//   const { phone, otp } = req.body;

//   // In a real application, verify OTP from the database or cache
//   if (otp !== '123456') {
//     return res.status(400).json({ message: 'Invalid OTP' });
//   }

//   const token = jwt.sign({ phone }, process.env.JWT_SECRET);

//   res.status(200).json({ token });
// }


export async function verifyOTP(req, res) {
    const { phone, otp } = req.body;
  
    // In a real application, verify OTP from the database or cache
    if (otp !== '123456') {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  
    const user = await findUserByPhone(phone);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const token = jwt.sign(
      { name: user.name, phone: user.phone },
      process.env.JWT_SECRET
    );
  
    res.status(200).json({ token });
  }