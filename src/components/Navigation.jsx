import { useState } from "react";
import { FiEdit3, FiLogOut, FiPlus, FiSettings, FiUser } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLocale from "../context/LocaleContext";
import useAuth from "../hooks/useAuth";
import { content } from "../utils/content";
import SettingsDrawer from "./SettingsDrawer";

export default function Navigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { locale } = useLocale();

  const text = content[locale].nav;
  const navItems = content[locale].nav;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = [
    { id: 1, name: navItems.home, href: "/", active: pathname === "/" },
    {
      id: 2,
      name: navItems.archives,
      href: "/archives",
      active: pathname === "/archives",
    },
    { id: 3, name: navItems.add, href: "/add", active: pathname === "/add" },
  ];

  return (
    <>
      <nav className="border-b border-slate-800 light:border-slate-200 bg-[#0f172a]/80 light:bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 text-white group-hover:scale-110 transition-transform">
              <FiEdit3 className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white light:text-slate-900 tracking-tight group-hover:text-blue-400 transition-colors">
              NotesApp
            </span>
          </Link>

          <ul className="flex items-center gap-2 md:gap-4">
            <li>
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900 hover:bg-slate-800/50 light:hover:bg-slate-100"
                title={text.settings}
              >
                <FiSettings className="w-4 h-4" />
              </button>
            </li>
            {user &&
              navigation.map((item) =>
                item.id !== 3 ? (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        item.active
                          ? "bg-slate-800 light:bg-slate-100 text-white light:text-slate-900 shadow-sm ring-1 ring-slate-700 light:ring-slate-200"
                          : "text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900 hover:bg-slate-800/50 light:hover:bg-slate-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ) : (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                        item.active
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                          : "bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/20"
                      }`}
                    >
                      <FiPlus className="w-4 h-4" />
                      <span className="hidden sm:inline">{item.name}</span>
                      <span className="sm:hidden text-[10px] uppercase">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                )
              )}
            {user && (
              <li className="hidden lg:flex items-center gap-2 mr-2 px-3 py-1.5 bg-slate-800/50 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 rounded-full">
                <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400">
                  <FiUser className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-bold text-slate-300 light:text-slate-700">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm font-semibold text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200"
                  title={text.logout}
                >
                  <FiLogOut className="w-4 h-4" />
                </button>
              </li>
            )}
            {user && <li></li>}
          </ul>
        </div>
      </nav>

      <SettingsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
