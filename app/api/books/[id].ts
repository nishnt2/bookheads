import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const bookIndex = books.findIndex(
    (book) => book.id === parseInt(id as string, 10)
  );

  if (req.method === 'GET') {
    // Get book by ID
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(books[bookIndex]);
  } else if (req.method === 'PUT') {
    // Update book details
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const updatedBook = { ...books[bookIndex], ...req.body };
    books[bookIndex] = updatedBook;
    res.status(200).json(updatedBook);
  } else if (req.method === 'DELETE') {
    // Delete a book
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }
    books.splice(bookIndex, 1);
    res.status(204).end();
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
