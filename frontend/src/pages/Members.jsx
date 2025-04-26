import { useEffect, useState } from "react";
import axios from "axios";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "actif",
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    axios
      .get("http://localhost/library-management/backend/controllers/members.php")
      .then((res) => setMembers(res.data));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost/library-management/backend/controllers/members.php", form);
      alert("Membre ajouté !");
      setShowForm(false);
      loadMembers();
      setForm({ name: "", email: "", phone: "", status: "actif" });
    } catch (err) {
      alert("Erreur lors de l'ajout.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Membres</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Fermer" : "Ajouter membre"}
        </button>
      </div>

      {/* Tableau des membres */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full table-auto bg-white shadow rounded overflow-hidden">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Nom</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Téléphone</th>
              <th className="px-4 py-2 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{m.name}</td>
                <td className="px-4 py-2">{m.email}</td>
                <td className="px-4 py-2">{m.phone}</td>
                <td className="px-4 py-2">{m.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulaire d'ajout */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 shadow rounded space-y-4 max-w-xl">
          <h2 className="text-lg font-semibold">Ajouter un nouveau membre</h2>
          <input
            type="text"
            placeholder="Nom"
            className="w-full border px-4 py-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Téléphone"
            className="w-full border px-4 py-2 rounded"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <select
            className="w-full border px-4 py-2 rounded"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="actif">Actif</option>
            <option value="expiré">Expiré</option>
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Enregistrer
          </button>
        </form>
      )}
    </div>
  );
}
