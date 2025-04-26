import MobileMenuButton from "./MobileMenuButton";

export default function Header({ onAuthToggle, toggleSidebar }) {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <MobileMenuButton toggleSidebar={toggleSidebar} />
        <h1 className="text-xl font-bold text-blue-900">Gestion de la Bibliothèque</h1>
      </div>
      <button
        onClick={onAuthToggle}
        className="text-blue-700 hover:text-blue-900 font-semibold border border-blue-700 px-4 py-1 rounded"
      >
        Se connecter / S'inscrire
      </button>
    </header>
  );
}
