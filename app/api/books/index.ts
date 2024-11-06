import type { NextApiRequest, NextApiResponse } from 'next';

let books: any[] = []; // In-memory store for simplicity

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get all books
    res.status(200).json(books);
  } else if (req.method === 'POST') {
    // Create a new book
    const { title, author, genre, condition, availability } = req.body;
    const newBook = {
      id: books.length + 1,
      title,
      author,
      genre,
      condition,
      availability,
      owner: req.body.owner, // Assuming the owner's ID is sent in the request
    };
    books.push(newBook);
    res.status(201).json(newBook);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
