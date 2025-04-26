import { useEffect, useState } from "react";
import axios from "axios";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("title");

  useEffect(() => {
    axios
      .get("http://localhost/library-management/backend/controllers/books.php")
      .then((res) => setBooks(res.data));
  }, []);

  const filteredBooks = books.filter((book) =>
    book[filter].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Rechercher un livre</h1>

      {/* Recherche avancée */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="title">Titre</option>
          <option value="author">Auteur</option>
          <option value="category">Catégorie</option>
        </select>
        <input
          type="text"
          placeholder={`Rechercher par ${filter}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-4 py-2 rounded"
        />
      </div>

      {/* Résultats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded shadow overflow-hidden">
            <img
              src={`http://localhost/library-management/backend/uploads/${book.cover_image}`}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-1">
              <h3 className="font-bold text-lg">{book.title}</h3>
              <p className="text-sm text-gray-600">Auteur : {book.author}</p>
              <p className="text-sm text-gray-500">Catégorie : {book.category}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => alert(`Consultation du livre : ${book.title}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  🔍 Consulter
                </button>
                <button
                  onClick={() => alert(`Emprunt du livre : ${book.title}`)}
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm"
                >
                  📘 Emprunter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
