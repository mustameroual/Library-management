import { NavLink } from "react-router-dom";
import { BookOpen, Users, ClipboardList } from "lucide-react";

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-blue-900 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out w-64 z-40 md:translate-x-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-blue-800">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-10 w-10 object-contain"
        />
        <span className="text-xl font-bold">Bibliothèque</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 px-4 rounded hover:bg-blue-800 ${
              isActive ? "bg-blue-800" : ""
            }`
          }
        >
          📊 Dashboard
        </NavLink>
        <NavLink
          to="/books"
          className={({ isActive }) =>
            `block py-2 px-4 rounded hover:bg-blue-800 ${
              isActive ? "bg-blue-800" : ""
            }`
          }
        >
          <BookOpen className="inline mr-2" /> Livres
        </NavLink>
        <NavLink
          to="/members"
          className={({ isActive }) =>
            `block py-2 px-4 rounded hover:bg-blue-800 ${
              isActive ? "bg-blue-800" : ""
            }`
          }
        >
          <Users className="inline mr-2" /> Membres
        </NavLink>
        <NavLink
          to="/loans"
          className={({ isActive }) =>
            `block py-2 px-4 rounded hover:bg-blue-800 ${
              isActive ? "bg-blue-800" : ""
            }`
          }
        >
          <ClipboardList className="inline mr-2" /> Emprunts
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-800 text-sm">
        &copy; 2025
      </div>
    </aside>
  );
}
