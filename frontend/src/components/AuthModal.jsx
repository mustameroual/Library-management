import { useState } from "react";
import axios from "axios";

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost/library-management/backend/auth/login.php"
      : "http://localhost/library-management/backend/auth/signup.php";
    try {
      const res = await axios.post(url, form);
      alert(res.data.message || "Succès !");
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || "Erreur");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {isLogin ? "Connexion" : "Inscription"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              className="w-full border px-3 py-2 rounded"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border px-3 py-2 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <div className="flex justify-between items-center">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {isLogin ? "Se connecter" : "S'inscrire"}
            </button>
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-black">
              ✕ Fermer
            </button>
          </div>
        </form>
        <p className="text-sm mt-4">
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"} {" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
}
