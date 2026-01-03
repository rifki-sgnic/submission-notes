import { useState } from "react";
import { FiArrowRight, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { login as loginApi, register as registerApi } from "../../api/auth";
import useLocale from "../../context/LocaleContext";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";
import { content } from "../../utils/content";

export default function Register() {
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { alert } = useAlert();
  const { login } = useAuth();
  const { locale } = useLocale();

  const text = content[locale].auth;
  const alerts = content[locale].alerts;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      alert({
        type: "warn",
        message: alerts.passwordMismatch,
      });
      return;
    }

    setIsLoading(true);
    const { error: regError, message: regMessage } = await registerApi({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (!regError) {
      const { error: loginError, data: loginData } = await loginApi({
        email: values.email,
        password: values.password,
      });

      if (!loginError) {
        await login(loginData.accessToken);
        alert({
          type: "success",
          message: alerts.registerSuccessLogin,
        });
        navigate("/");
      } else {
        alert({
          type: "success",
          message: alerts.registerSuccess,
        });
        navigate("/login");
      }
    } else {
      alert({
        type: "error",
        message: regMessage || alerts.registerError,
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
            <h1 className="text-3xl font-black text-white light:text-slate-900 tracking-tight mb-2">
              {text.registerTitle}
            </h1>
            <p className="text-slate-400 light:text-slate-500">
              {text.registerDescription}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <FiUser className="w-5 h-5 text-slate-500 light:text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                name="name"
                type="text"
                required
                placeholder={text.name}
                value={values.name}
                onChange={handleChange}
                className="block w-full pl-12 pr-4 py-3 bg-slate-800/50 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 rounded-2xl text-white light:text-slate-900 placeholder-slate-600 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              />
            </div>

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
                className="block w-full pl-12 pr-4 py-3 bg-slate-800/50 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 rounded-2xl text-white light:text-slate-900 placeholder-slate-600 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <FiLock className="w-5 h-5 text-slate-500 light:text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                name="password"
                type="password"
                required
                placeholder={text.password}
                value={values.password}
                onChange={handleChange}
                className="block w-full pl-12 pr-4 py-3 bg-slate-800/50 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 rounded-2xl text-white light:text-slate-900 placeholder-slate-600 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <FiLock className="w-5 h-5 text-slate-500 light:text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                name="confirmPassword"
                type="password"
                required
                placeholder={text.confirmPassword}
                value={values.confirmPassword}
                onChange={handleChange}
                className="block w-full pl-12 pr-4 py-3 bg-slate-800/50 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 rounded-2xl text-white light:text-slate-900 placeholder-slate-600 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? "Creating account..." : text.registerButton}
              <FiArrowRight />
            </button>
          </form>

          <p className="relative z-10 text-center mt-8 text-slate-400 light:text-slate-500 text-sm">
            {text.haveAccount}{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-500 font-bold transition-colors"
            >
              {text.loginHere}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
