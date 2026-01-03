import { useEffect, useState } from "react";
import { FiArchive, FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { deleteNote, getArchivedNotes, unarchiveNote } from "../api/notes";
import NoteList from "../components/NoteList";
import { NoteListSkeleton } from "../components/NoteSkeleton";
import useLocale from "../context/LocaleContext";
import useAlert from "../hooks/useAlert";
import RootLayout from "../layouts/RootLayout";
import { content } from "../utils/content";

function Archives() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { alert } = useAlert();
  const { locale } = useLocale();

  const text = content[locale].archives;
  const homeText = content[locale].home;
  const alerts = content[locale].alerts;

  const search = searchParams.get("search") || "";

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      const { error, data } = await getArchivedNotes();
      if (!error) {
        setNotes(data);
      }
      setLoading(false);
    }
    fetchNotes();
  }, []);

  async function onSearchChangeHandler(event) {
    const query = event.target.value;
    setSearchParams({ search: query });
  }

  async function onUnarchiveHandler(noteId) {
    const { error } = await unarchiveNote(noteId);
    if (!error) {
      const { data } = await getArchivedNotes();
      setNotes(data);
      alert({ type: "success", message: alerts.noteUnarchived });
    } else {
      alert({ type: "error", message: alerts.failedUnarchive });
    }
  }

  async function onDeleteHandler(noteId) {
    const { error } = await deleteNote(noteId);
    if (!error) {
      const { data } = await getArchivedNotes();
      setNotes(data);
      alert({ type: "success", message: alerts.noteDeleted });
    } else {
      alert({ type: "error", message: alerts.failedDelete });
    }
  }

  const archivedNotes = notes
    .filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <RootLayout>
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <FiArchive className="w-6 h-6 text-amber-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white light:text-slate-900 tracking-tight bg-linear-to-r from-white to-slate-400 light:from-slate-900 light:to-slate-600 bg-clip-text">
              {text.title}
            </h1>
          </div>
          <p className="text-slate-400 light:text-slate-600 text-lg">
            {text.description}
          </p>
        </div>

        <div className="relative group w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-slate-500 light:text-slate-400 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder={homeText.searchPlaceholder}
            value={search}
            onChange={onSearchChangeHandler}
            className="block w-full pl-10 pr-3 py-3 border border-slate-700/50 light:border-slate-200 rounded-xl bg-slate-800/50 light:bg-white text-slate-200 light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-sm"
          />
        </div>
      </header>

      <section>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-xl font-bold text-white light:text-slate-800">
            {text.title}
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-sm font-semibold bg-amber-500/10 text-amber-400 light:text-amber-600 border border-amber-500/20">
            {loading ? "..." : archivedNotes.length}
          </span>
        </div>

        {loading ? (
          <NoteListSkeleton count={3} />
        ) : (
          <NoteList
            variant="archived"
            notes={archivedNotes}
            onArchive={onUnarchiveHandler}
            onDelete={onDeleteHandler}
          />
        )}
      </section>
    </RootLayout>
  );
}

export default Archives;
