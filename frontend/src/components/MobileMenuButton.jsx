export default function MobileMenuButton({ toggleSidebar }) {
    return (
      <button
        className="md:hidden text-blue-700 hover:text-blue-900"
        onClick={toggleSidebar}
      >
        ☰
      </button>
    );
  }
  