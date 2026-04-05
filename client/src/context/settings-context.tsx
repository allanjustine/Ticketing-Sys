"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Theme =
  | "light"
  | "dark"
  | "rose"
  | "violet"
  | "orange"
  | "green"
  | "blue"
  | "pink";

export type FontSize = "sm" | "md" | "lg" | "xl";

interface SettingsContextType {
  theme: Theme;
  fontSize: FontSize;
  setTheme: (t: Theme) => void;
  setFontSize: (s: FontSize) => void;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

const FONT_SIZE_MAP: Record<FontSize, string> = {
  sm: "14px",
  md: "17px",
  lg: "20px",
  xl: "24px",
};

const COLOR_THEMES: Theme[] = ["rose", "violet", "orange", "green", "blue", "pink"];

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  COLOR_THEMES.forEach((t) => root.classList.remove(`theme-${t}`));
  root.classList.remove("dark");

  if (theme === "dark") {
    root.classList.add("dark");
  } else if (COLOR_THEMES.includes(theme)) {
    root.classList.add(`theme-${theme}`);
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [fontSize, setFontSizeState] = useState<FontSize>("md");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const t = (localStorage.getItem("settings-theme") as Theme) ?? "light";
    const s = (localStorage.getItem("settings-font-size") as FontSize) ?? "md";
    setThemeState(t);
    setFontSizeState(s);
    applyTheme(t);
    document.documentElement.style.fontSize = FONT_SIZE_MAP[s];
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    applyTheme(t);
    localStorage.setItem("settings-theme", t);
  };

  const setFontSize = (s: FontSize) => {
    setFontSizeState(s);
    document.documentElement.style.fontSize = FONT_SIZE_MAP[s];
    localStorage.setItem("settings-font-size", s);
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        fontSize,
        setTheme,
        setFontSize,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextType {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
