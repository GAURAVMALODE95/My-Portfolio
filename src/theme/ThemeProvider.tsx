import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
});

function currentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      const root = document.documentElement;
      root.classList.remove(prev);
      root.classList.add(next);
      root.style.backgroundColor = next === "dark" ? "#0E0F12" : "#F7F6F2";
      try {
        localStorage.setItem("gm-theme", next);
      } catch {
        /* storage unavailable */
      }
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta)
        meta.setAttribute("content", next === "dark" ? "#0E0F12" : "#F7F6F2");
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
