import { useState } from "react";
import axios from "axios";

export default function AuthForm() {
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
    } catch (err) {
      alert(err.response?.data?.error || "Erreur");
    }
  };

  return (
    <div className="absolute top-4 left-4 bg-white border p-4 shadow rounded w-72 z-50">
      <h2 className="text-lg font-semibold mb-2">
        {isLogin ? "Connexion" : "Inscription"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {!isLogin && (
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            className="w-full border px-3 py-2 rounded"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
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
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Se connecter" : "S'inscrire"}
        </button>
      </form>
      <p className="text-sm text-center mt-3">
        {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
        <button
          className="text-blue-600 hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "S'inscrire" : "Se connecter"}
        </button>
      </p>
    </div>
  );
}
