import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import "./App.css";

function App() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const formattedTime = format(now, "HH:mm:ss");
      setTime(formattedTime);

      const formattedDate = format(now, "EEEE, d 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
      setDate(formattedDate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <header>
        <ThemeToggle />
      </header>
      <div className="date" id="date">
        {date || "Carregando data..."}
      </div>
      <div className="time" id="time">
        {time || "--:--:--"}
      </div>
      <footer>Desenvolvido por Odenir Gomes Soluções</footer>
    </main>
  );
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === "light" ? "Ativar Modo Escuro" : "Ativar Modo Claro"}
    </button>
  );
};

export default App;
