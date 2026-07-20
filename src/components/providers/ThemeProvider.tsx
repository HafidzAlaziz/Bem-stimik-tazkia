"use client";

import * as React from "react";

type Theme = "light" | "dark";

const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: Theme;
}>({
  theme: "light",
  setTheme: () => null,
  resolvedTheme: "light",
});

export const useTheme = () => React.useContext(ThemeContext);

export function ThemeProvider({ 
  children,
}: { 
  children: React.ReactNode;
  [key: string]: any;
}) {
  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    root.style.colorScheme = "light";
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "light", setTheme: () => {}, resolvedTheme: "light" }}>
      {children}
    </ThemeContext.Provider>
  );
}
