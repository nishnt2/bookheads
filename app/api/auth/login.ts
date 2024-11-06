import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    // Find the user
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate a token
    const token = jwt.sign({ id: user.id, email: user.email }, 'secretKey', {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
