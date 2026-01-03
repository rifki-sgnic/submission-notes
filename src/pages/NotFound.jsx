import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useLocale from "../context/LocaleContext";
import RootLayout from "../layouts/RootLayout";
import { content } from "../utils/content";

export default function NotFound() {
  const navigate = useNavigate();
  const { locale } = useLocale();
  const text = content[locale].notFound;

  return (
    <RootLayout>
      <div className="max-w-4xl mx-auto py-20 text-center">
        <div className="w-20 h-20 bg-slate-800 light:bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiAlertTriangle className="w-10 h-10 text-slate-500 light:text-slate-400" />
        </div>
        <h2 className="text-3xl font-bold text-white light:text-slate-900 mb-4">
          {text.title}
        </h2>
        <p className="text-slate-400 light:text-slate-600 mb-8">
          {text.description}
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 text-white light:text-slate-900 font-bold py-3 px-6 rounded-xl transition-all"
        >
          <FiArrowLeft /> {text.backButton}
        </button>
      </div>
    </RootLayout>
  );
}
