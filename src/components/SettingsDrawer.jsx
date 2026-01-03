import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FiMoon, FiSettings, FiSun, FiX } from "react-icons/fi";
import useLocale from "../context/LocaleContext";
import useTheme from "../hooks/useTheme";
import { content } from "../utils/content";

function SettingsDrawer({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLocale();
  const [isAnimating, setIsAnimating] = useState(false);

  const text = content[locale].settings;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex justify-end">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/60 light:bg-slate-900/40 transition-opacity duration-300 ease-in-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <aside
        className={`relative w-full max-w-sm bg-[#0f172a] light:bg-slate-50 border-l border-slate-800 light:border-slate-200 shadow-2xl h-full flex flex-col transform transition-transform duration-300 ease-in-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="p-6 border-b border-slate-800 light:border-slate-200 flex items-center justify-between bg-slate-800/20 light:bg-white/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/10 rounded-lg text-blue-400">
              <FiSettings className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-white light:text-slate-900 tracking-tight">
              {text.title}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 light:text-slate-500 hover:bg-slate-800 light:hover:bg-slate-100 hover:text-white light:hover:text-slate-900 transition-all cursor-pointer"
          >
            <FiX className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Appearance Section */}
          <section>
            <h3 className="text-sm font-bold text-slate-500 light:text-slate-400 uppercase tracking-widest mb-4">
              {text.appearance}
            </h3>

            <div className="bg-slate-800/50 light:bg-white border border-slate-700/50 light:border-slate-200 rounded-3xl p-6 shadow-xl space-y-6">
              {/* Theme Toggle */}
              <div>
                <p className="text-white light:text-slate-900 font-bold mb-4">
                  {text.chooseTheme}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => theme === "dark" && toggleTheme()}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                      theme === "light"
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <FiSun className="w-6 h-6" />
                    <span className="text-sm font-bold">{text.light}</span>
                  </button>

                  <button
                    onClick={() => theme === "light" && toggleTheme()}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                      theme === "dark"
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "bg-slate-100 border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <FiMoon className="w-6 h-6" />
                    <span className="text-sm font-bold">{text.dark}</span>
                  </button>
                </div>
              </div>

              {/* Language Toggle */}
              <div>
                <p className="text-white light:text-slate-900 font-bold mb-4">
                  {text.chooseLanguage}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => locale === "id" && toggleLocale()}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                      locale === "en"
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600 light:bg-slate-100 light:border-slate-200 light:text-slate-500 light:hover:border-slate-300"
                    }`}
                  >
                    <span className="text-2xl">🇺🇸</span>
                    <span className="text-sm font-bold">English</span>
                  </button>

                  <button
                    onClick={() => locale === "en" && toggleLocale()}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                      locale === "id"
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600 light:bg-slate-100 light:border-slate-200 light:text-slate-500 light:hover:border-slate-300"
                    }`}
                  >
                    <span className="text-2xl">🇮🇩</span>
                    <span className="text-sm font-bold">Indonesia</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section>
            <h3 className="text-sm font-bold text-slate-500 light:text-slate-400 uppercase tracking-widest mb-4">
              {text.appInfo}
            </h3>
            <div className="bg-slate-800/30 light:bg-slate-100/50 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 light:text-slate-400">
                  {text.version}
                </span>
                <span className="text-slate-300 light:text-slate-700 font-medium">
                  1.0.0
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 light:text-slate-400">
                  {text.status}
                </span>
                <span className="text-emerald-400 light:text-emerald-600 font-bold">
                  {text.online}
                </span>
              </div>
            </div>
          </section>
        </div>

        <footer className="p-6 border-t border-slate-800 light:border-slate-200 bg-slate-800/20 light:bg-white/50">
          <p className="text-center text-xs text-slate-500 light:text-slate-400">
            &copy; 2026 NotesApp &bull; Premium Personal Notes
          </p>
        </footer>
      </aside>
    </div>
  );
}

SettingsDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsDrawer;
