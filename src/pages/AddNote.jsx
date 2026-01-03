import DOMPurify from "dompurify";
import { useRef, useState } from "react";
import { FiAlignLeft, FiSave, FiType, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { addNote } from "../api/notes";
import useLocale from "../context/LocaleContext";
import useAlert from "../hooks/useAlert";
import RootLayout from "../layouts/RootLayout";
import { content } from "../utils/content";

function AddNote() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bodyRef = useRef(null);
  const navigate = useNavigate();
  const { alert } = useAlert();
  const { locale } = useLocale();

  const text = content[locale].addNote;
  const alerts = content[locale].alerts;

  const onTitleChangeHandler = (event) => {
    const value = event.target.value;
    if (value.length <= 30) {
      setTitle(value);
    }
  };

  const onSubmitHandler = async () => {
    const body = bodyRef.current ? bodyRef.current.innerHTML : "";

    if (!title.trim() || !body.trim() || body === "<br>") {
      setError(alerts.fillAllFields);
      return;
    }

    if (body.replace(/<[^>]*>/g, "").length < 10) {
      setError(alerts.bodyLength);
      return;
    }

    setIsLoading(true);
    const sanitizedBody = DOMPurify.sanitize(body);
    const { error: apiError } = await addNote({ title, body: sanitizedBody });

    if (!apiError) {
      alert({ type: "success", message: alerts.noteSaved });
      navigate("/");
    } else {
      alert({ type: "error", message: alerts.failedSave });
      setIsLoading(false);
    }
  };

  const remainingChars = 30 - title.length;

  return (
    <RootLayout className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white light:text-slate-900 tracking-tight">
            {text.title}
          </h1>
          <p className="text-slate-400 light:text-slate-600 mt-1">
            {text.description}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 light:bg-slate-100 text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900 hover:bg-slate-700 light:hover:bg-slate-200 transition-all font-semibold"
          >
            <FiX /> {text.cancel}
          </button>
          <button
            onClick={onSubmitHandler}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95 group"
          >
            <FiSave /> {isLoading ? text.saving : text.save}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        <div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <FiType className="w-5 h-5 text-slate-500 light:text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder={text.titlePlaceholder}
              value={title}
              onChange={onTitleChangeHandler}
              className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 light:bg-white border border-slate-700/50 light:border-slate-200 rounded-2xl text-2xl font-bold text-white light:text-slate-900 placeholder-slate-600 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
          <div className="flex justify-end mt-2">
            <p
              className={`text-xs font-medium tracking-wider uppercase ${
                remainingChars <= 10 ? "text-amber-500" : "text-slate-500"
              }`}
            >
              {remainingChars} {text.limit}
            </p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute top-[1.2rem] left-4 pointer-events-none z-10">
            <FiAlignLeft className="w-5 h-5 text-slate-500 light:text-slate-400 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <div
            contentEditable
            ref={bodyRef}
            data-placeholder={text.bodyPlaceholder}
            className="block w-full min-h-[400px] pl-12 pr-4 py-4 bg-slate-800/50 light:bg-white border border-slate-700/50 light:border-slate-200 rounded-2xl text-slate-200 light:text-slate-800 text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all relative empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 light:empty:before:text-slate-400 empty:before:absolute"
          />
        </div>
      </div>

      <div className="mt-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 shrink-0">
          <FiType className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">
            {text.tipsTitle}
          </h4>
          <p className="text-slate-400 light:text-slate-600 text-sm leading-relaxed">
            {text.tipsDescription}{" "}
            <code className="text-slate-200 light:text-slate-800 bg-slate-800 light:bg-slate-200 px-1 rounded">
              Ctrl+B
            </code>{" "}
            (Bold),{" "}
            <code className="text-slate-200 light:text-slate-800 bg-slate-800 light:bg-slate-200 px-1 rounded">
              Ctrl+I
            </code>{" "}
            (Italic), and{" "}
            <code className="text-slate-200 light:text-slate-800 bg-slate-800 light:bg-slate-200 px-1 rounded">
              Ctrl+U
            </code>{" "}
            (Underline).
          </p>
        </div>
      </div>
    </RootLayout>
  );
}

export default AddNote;
