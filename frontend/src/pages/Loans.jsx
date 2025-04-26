import { useEffect, useState } from "react";
import axios from "axios";

export default function Loans() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = () => {
    axios
      .get("http://localhost/library-management/backend/controllers/loans.php")
      .then((res) => setLoans(res.data));
  };

  const markReturned = async (loanId) => {
    const returnDate = new Date().toISOString().split("T")[0];
    try {
      await axios.put("http://localhost/library-management/backend/controllers/loans.php", {
        id: loanId,
        return_date: returnDate,
        status: "retourné",
      });
      alert("Livre marqué comme retourné");
      fetchLoans();
    } catch (err) {
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des Emprunts</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Membre</th>
              <th className="px-4 py-2 text-left">Livre</th>
              <th className="px-4 py-2 text-left">Date Emprunt</th>
              <th className="px-4 py-2 text-left">Date Retour</th>
              <th className="px-4 py-2 text-left">Statut</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{loan.member_name}</td>
                <td className="px-4 py-2">{loan.book_title}</td>
                <td className="px-4 py-2">{loan.loan_date}</td>
                <td className="px-4 py-2">
                  {loan.return_date || "—"}
                </td>
                <td className="px-4 py-2 capitalize">{loan.status}</td>
                <td className="px-4 py-2">
                  {loan.status === "en_cours" ? (
                    <button
                      onClick={() => markReturned(loan.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Marquer comme retourné
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm italic">Déjà retourné</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
