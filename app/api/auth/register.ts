import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const users: any[] = []; // In-memory user store for simplicity

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });
    }

    // Check if the user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, email, password: hashedPassword };
    users.push(newUser);

    // Create a JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      'secretKey',
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
