import PropTypes from "prop-types";
import { FiMeh } from "react-icons/fi";
import useLocale from "../context/LocaleContext";
import { content } from "../utils/content";
import NoteItem from "./NoteItem";

function NoteList({ variant = "active", notes, onArchive, onDelete }) {
  const { locale } = useLocale();
  const text = content[locale].noteList;

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 bg-slate-800 light:bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-500 light:text-slate-400">
          <FiMeh className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-semibold text-slate-300 light:text-slate-800">
          {text.emptySearch}
        </h3>
        {variant === "active" ? (
          <p className="text-slate-500 mt-2">{text.emptyActive}</p>
        ) : (
          <p className="text-slate-500 mt-2">{text.emptyArchived}</p>
        )}
      </div>
    );
  }

  const localeOptions = {
    id: "id-ID",
    en: "en-US",
  };

  const groupedNotes = notes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    const monthYear = date.toLocaleDateString(localeOptions[locale], {
      month: "long",
      year: "numeric",
    });

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(note);
    return groups;
  }, {});

  return (
    <div className="space-y-12">
      {Object.entries(groupedNotes).map(([monthYear, items]) => (
        <section key={monthYear} className="relative">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-lg font-bold text-slate-400 light:text-slate-500 bg-slate-900 light:bg-slate-50 pr-4 relative z-10 uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              {monthYear}
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-800 light:bg-slate-100 text-slate-500 light:text-slate-600 border border-slate-700/50 light:border-slate-200">
                {items.length}
              </span>
            </h2>
            <div className="flex-1 h-px bg-slate-800 light:bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((note) => (
              <NoteItem
                key={note.id}
                onArchive={onArchive}
                onDelete={onDelete}
                {...note}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

NoteList.propTypes = {
  variant: PropTypes.string,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteList;
