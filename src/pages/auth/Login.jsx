import { useState } from "react";
import { FiLock, FiLogOut, FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { login as loginApi } from "../../api/auth";
import useLocale from "../../context/LocaleContext";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";
import { content } from "../../utils/content";

export default function Login() {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { alert } = useAlert();
  const navigate = useNavigate();
  const { locale } = useLocale();

  const text = content[locale].auth;
  const alerts = content[locale].alerts;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error, data, message } = await loginApi({
      email: values.email,
      password: values.password,
    });

    if (!error) {
      await login(data.accessToken);
      alert({
        type: "success",
        message: alerts.loginSuccess,
      });

      navigate("/");
    } else {
      alert({
        type: "error",
        message: message || alerts.loginError,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] light:bg-slate-50 flex items-center justify-center p-4 selection:bg-blue-500/30">
      <div className="w-full max-w-md">
        <div className="bg-[#1e293b]/50 light:bg-white border border-slate-700/50 light:border-slate-200 rounded-3xl p-8 md:p-10 shadow-2xl light:shadow-xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mx-auto mb-6 rotate-3">
              <FiLock className="w-8 h-8 text-white -rotate-3" />
            </div>
            <h1 className="text-3xl font-black text-white light:text-slate-900 tracking-tight mb-2">
              {text.loginTitle}
            </h1>
            <p className="text-slate-400 light:text-slate-500">
              {text.loginDescription}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <FiMail className="w-5 h-5 text-slate-500 light:text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={text.email}
                  value={values.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-800/50 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 rounded-2xl text-white light:text-slate-900 placeholder-slate-600 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <FiLogOut className="w-5 h-5 text-slate-500 light:text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder={text.password}
                  value={values.password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-800/50 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 rounded-2xl text-white light:text-slate-900 placeholder-slate-600 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-[0.98]"
            >
              {isLoading ? "Signing in..." : text.loginButton}
            </button>
          </form>

          <p className="relative z-10 text-center mt-8 text-slate-400 light:text-slate-500">
            {text.noAccount}{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-500 font-bold transition-colors"
            >
              {text.registerHere}
            </Link>
          </p>
        </div>

        {/* Brand Link */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="text-sm font-bold text-slate-400 light:text-slate-600 uppercase tracking-widest">
              NotesApp
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
