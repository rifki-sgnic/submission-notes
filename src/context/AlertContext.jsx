import { createContext, useCallback, useState } from "react";
import Alert from "../components/Alert";

export const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const alert = useCallback(({ type, message, duration }) => {
    const id = Date.now() + Math.random();
    setAlerts((prev) => {
      const newAlerts = [...prev, { id, type, message, duration }];
      if (newAlerts.length > 3) {
        return newAlerts.slice(newAlerts.length - 3);
      }
      return newAlerts;
    });
  }, []);

  const closeAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ alert }}>
      {children}
      <div className="fixed bottom-6 right-6 z-9999 flex flex-col gap-3 w-full max-w-sm px-4 pointer-events-none">
        {alerts.map((alertData) => (
          <div key={alertData.id} className="pointer-events-auto">
            <Alert
              type={alertData.type}
              message={alertData.message}
              duration={alertData.duration}
              onClose={() => closeAlert(alertData.id)}
            />
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
};
