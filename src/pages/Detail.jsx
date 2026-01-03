import parse from "html-react-parser";
import { useEffect, useState } from "react";
import {
  FiArchive,
  FiArrowLeft,
  FiClock,
  FiLoader,
  FiTrash2,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../api/notes";
import { NoteDetailSkeleton } from "../components/NoteSkeleton";
import useLocale from "../context/LocaleContext";
import useAlert from "../hooks/useAlert";
import RootLayout from "../layouts/RootLayout";
import { content } from "../utils/content";
import { showFormattedDate } from "../utils/data";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { alert } = useAlert();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { locale } = useLocale();

  const text = content[locale].detail;
  const alerts = content[locale].alerts;

  useEffect(() => {
    async function fetchNote() {
      setLoading(true);
      const { error, data } = await getNote(id);
      if (!error) {
        setNote(data);
      }
      setLoading(false);
    }
    fetchNote();
  }, [id]);

  const onArchiveHandler = async () => {
    setActionLoading(true);
    const { error } = await archiveNote(id);
    if (!error) {
      alert({ type: "success", message: alerts.noteArchived });
      navigate("/archives");
    } else {
      alert({ type: "error", message: alerts.failedArchive });
      setActionLoading(false);
    }
  };

  const onUnarchiveHandler = async () => {
    setActionLoading(true);
    const { error } = await unarchiveNote(id);
    if (!error) {
      alert({ type: "success", message: alerts.noteUnarchived });
      navigate("/");
    } else {
      alert({ type: "error", message: alerts.failedUnarchive });
      setActionLoading(false);
    }
  };

  const onDeleteHandler = async () => {
    setActionLoading(true);
    const { error } = await deleteNote(id);
    if (!error) {
      alert({ type: "success", message: alerts.noteDeleted });
      navigate("/");
    } else {
      alert({ type: "error", message: alerts.failedDelete });
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <RootLayout className="max-w-4xl">
        <NoteDetailSkeleton />
      </RootLayout>
    );
  }

  if (!note) {
    return (
      <RootLayout className="max-w-4xl">
        <div className="max-w-4xl mx-auto py-20 text-center">
          <div className="w-20 h-20 bg-slate-800 light:bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiTrash2 className="w-10 h-10 text-slate-500 light:text-slate-400" />
          </div>
          <h2 className="text-3xl font-bold text-white light:text-slate-900 mb-4">
            {text.notFound}
          </h2>
          <p className="text-slate-400 light:text-slate-600 mb-8">
            {text.notFoundDescription}
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 text-white light:text-slate-900 font-bold py-3 px-6 rounded-xl transition-all"
          >
            <FiArrowLeft /> {text.backHome}
          </button>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout className="max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 light:text-slate-500 hover:text-white light:hover:text-slate-900 transition-colors mb-8 group"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>{text.goBack}</span>
      </button>

      <article className="bg-[#1e293b]/50 light:bg-white border border-slate-700/50 light:border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl light:shadow-xl backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>

        <header className="mb-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white light:text-slate-900 tracking-tight mb-6 leading-tight">
            {note.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 light:text-slate-500 text-sm">
            <div className="flex items-center gap-2 bg-slate-800/50 light:bg-slate-100 px-3 py-1.5 rounded-full border border-slate-700/50 light:border-slate-200">
              <FiClock className="w-4 h-4 text-blue-400" />
              <span>{showFormattedDate(note.createdAt, locale)}</span>
            </div>
            {note.archived && (
              <div className="flex items-center gap-2 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20 text-amber-500 font-semibold">
                <FiArchive className="w-4 h-4" />
                <span>{text.archivedStatus}</span>
              </div>
            )}
          </div>
        </header>

        <div className="prose prose-invert light:prose-slate prose-lg max-w-none text-slate-300 light:text-slate-700 leading-relaxed relative z-10">
          {parse(note.body)}
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-800 light:border-slate-100 flex flex-wrap gap-4 relative z-10">
          <button
            onClick={note.archived ? onUnarchiveHandler : onArchiveHandler}
            disabled={actionLoading}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 text-slate-200 light:text-slate-700 font-bold py-3 px-8 rounded-xl transition-all border border-slate-700 light:border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLoading ? (
              <FiLoader className="w-5 h-5 text-amber-500 animate-spin" />
            ) : (
              <FiArchive className="w-5 h-5 text-amber-500" />
            )}
            {note.archived ? text.unarchive : text.archive}
          </button>
          <button
            onClick={onDeleteHandler}
            disabled={actionLoading}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-bold py-3 px-8 rounded-xl transition-all border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLoading ? (
              <FiLoader className="w-5 h-5 animate-spin" />
            ) : (
              <FiTrash2 className="w-5 h-5" />
            )}
            {text.delete}
          </button>
        </footer>
      </article>
    </RootLayout>
  );
}

export default Detail;
