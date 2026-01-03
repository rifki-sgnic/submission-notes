import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useState } from "react";

const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem("locale") || "en";
  });

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  const value = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function useLocale() {
  return useContext(LocaleContext);
}
