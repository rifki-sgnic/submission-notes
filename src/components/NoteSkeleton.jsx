export function NoteItemSkeleton() {
  return (
    <article className="bg-[#1e293b] light:bg-white border border-slate-700/50 light:border-slate-200 rounded-2xl p-6 shadow-lg animate-pulse">
      <header className="mb-4">
        <div className="h-7 bg-slate-700 light:bg-slate-200 rounded-lg w-3/4 mb-2"></div>
        <div className="h-3 bg-slate-800 light:bg-slate-100 rounded-md w-1/4"></div>
      </header>
      <div className="space-y-3 min-h-20">
        <div className="h-4 bg-slate-800/50 light:bg-slate-100/50 rounded-md w-full"></div>
        <div className="h-4 bg-slate-800/50 light:bg-slate-100/50 rounded-md w-full"></div>
        <div className="h-4 bg-slate-800/50 light:bg-slate-100/50 rounded-md w-5/6"></div>
      </div>
      <footer className="mt-6 pt-4 border-t border-slate-700/50 light:border-slate-100 flex justify-end gap-2">
        <div className="h-8 bg-slate-800 light:bg-slate-100 rounded-lg w-24"></div>
        <div className="h-8 bg-red-500/10 rounded-lg w-20"></div>
      </footer>
    </article>
  );
}

export function NoteListSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <NoteItemSkeleton key={index} />
      ))}
    </div>
  );
}

export function NoteDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto shadow-2xl light:shadow-xl rounded-3xl p-8 md:p-12 bg-[#1e293b]/50 light:bg-white border border-slate-700/50 light:border-slate-200 animate-pulse">
      <div className="h-12 bg-slate-700 light:bg-slate-200 rounded-xl w-3/4 mb-6"></div>
      <div className="flex gap-4 mb-10">
        <div className="h-6 bg-slate-800 light:bg-slate-100 rounded-full w-40"></div>
      </div>
      <div className="space-y-4">
        <div className="h-5 bg-slate-800/50 light:bg-slate-100/50 rounded-lg w-full"></div>
        <div className="h-5 bg-slate-800/50 light:bg-slate-100/50 rounded-lg w-full"></div>
        <div className="h-5 bg-slate-800/50 light:bg-slate-100/50 rounded-lg w-1/2"></div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-800 light:border-slate-100 flex gap-4">
        <div className="h-12 bg-slate-800 light:bg-slate-100 rounded-xl w-32"></div>
        <div className="h-12 bg-red-500/10 rounded-xl w-32"></div>
      </div>
    </div>
  );
}
