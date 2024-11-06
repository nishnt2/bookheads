import { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  condition: string;
  availability: string;
}

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
    availability: '',
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    const data = await res.json();
    setBooks(data);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });
    if (res.ok) {
      fetchBooks(); // Refresh the list
      setNewBook({
        title: '',
        author: '',
        genre: '',
        condition: '',
        availability: '',
      });
    } else {
      alert('Failed to add book');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Book List</h1>
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id} className="mb-2">
            <span className="font-bold">{book.title}</span> by {book.author} (
            {book.genre}) - {book.condition} - {book.availability}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddBook} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Genre"
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Condition"
          value={newBook.condition}
          onChange={(e) =>
            setNewBook({ ...newBook, condition: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Availability"
          value={newBook.availability}
          onChange={(e) =>
            setNewBook({ ...newBook, availability: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Book
        </button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="mb-2">
            <span className="font-bold">{book.title}</span> by {book.author} (
            {book.genre}) - {book.condition} - {book.availability}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
