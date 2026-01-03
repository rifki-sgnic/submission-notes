import PropTypes from "prop-types";
import Navigation from "../components/Navigation";

function RootLayout({ children, className = "max-w-6xl" }) {
  return (
    <div className="min-h-screen bg-[#0f172a] light:bg-slate-50 text-slate-200 light:text-slate-900 font-sans selection:bg-blue-500/30">
      <Navigation />
      <main className={`${className} mx-auto px-4 py-12`}>{children}</main>
    </div>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default RootLayout;
