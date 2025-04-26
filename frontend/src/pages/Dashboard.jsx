import { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpen,
  Users,
  ClipboardList,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({ books: 0, members: 0, loans: 0 });
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/library-management/backend/controllers/books.php")
      .then(res => {
        setSuggestions(res.data.slice(0, 4)); // 4 suggestions max
        setStats((prev) => ({ ...prev, books: res.data.length }));
      });

    axios.get("http://localhost/library-management/backend/controllers/members.php")
      .then(res => {
        setStats((prev) => ({ ...prev, members: res.data.length }));
      });

    axios.get("http://localhost/library-management/backend/controllers/loans.php")
      .then(res => {
        setStats((prev) => ({ ...prev, loans: res.data.length }));
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>

      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <StatCard icon={<BookOpen className="text-blue-600 w-8 h-8" />} label="Livres" value={stats.books} />
        <StatCard icon={<Users className="text-green-600 w-8 h-8" />} label="Membres" value={stats.members} />
        <StatCard icon={<ClipboardList className="text-orange-600 w-8 h-8" />} label="Emprunts" value={stats.loans} />
      </div>

      {/* Suggestions */}
      <h2 className="text-xl font-semibold mb-4">Suggestions de livres</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {suggestions.map((book) => (
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
              <button className="mt-2 px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600">
                Consulter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded shadow p-4 flex items-center gap-4">
      {icon}
      <div>
        <h3 className="text-sm font-medium text-gray-600">{label}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
