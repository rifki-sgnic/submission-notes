import parse from "html-react-parser";
import PropTypes from "prop-types";
import { useState } from "react";
import { FiArchive, FiLoader, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import useLocale from "../context/LocaleContext";
import { content } from "../utils/content";
import { showFormattedDate } from "../utils/data";

function NoteItem({
  title,
  createdAt,
  body,
  id,
  archived,
  onArchive,
  onDelete,
}) {
  const { locale } = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const text = content[locale].detail;

  const handleArchive = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onArchive(id);
    setIsLoading(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onDelete(id);
    setIsLoading(false);
  };

  return (
    <article className="bg-[#1e293b] light:bg-white border border-slate-700/50 light:border-slate-200 rounded-2xl p-6 shadow-lg light:shadow-md hover:shadow-2xl light:hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 group">
      <header className="mb-4">
        <h3 className="text-xl font-bold text-slate-100 light:text-slate-900 group-hover:text-blue-400 transition-colors line-clamp-1">
          <Link to={`/notes/${id}`}>{title}</Link>
        </h3>
        <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wider">
          {showFormattedDate(createdAt, locale)}
        </p>
      </header>
      <div className="text-slate-400 light:text-slate-600 text-sm leading-relaxed line-clamp-4 min-h-20">
        {parse(body)}
      </div>
      <footer className="mt-6 pt-4 border-t border-slate-700/50 light:border-slate-100 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleArchive}
          disabled={isLoading}
          className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-600 hover:bg-slate-700 light:hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isLoading ? (
            <FiLoader className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <FiArchive className="w-3.5 h-3.5" />
          )}
          {archived ? text.unarchive : text.archive}
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="text-xs font-semibold px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          {isLoading ? (
            <FiLoader className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <FiTrash2 className="w-3.5 h-3.5" />
          )}
          {text.delete}
        </button>
      </footer>
    </article>
  );
}

NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteItem;
