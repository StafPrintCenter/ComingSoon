import { useEffect, useState } from "react";

const STORAGE_KEY = "spc-theme";

export function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    // Vérification initiale du DOM
    setDark(document.documentElement.classList.contains("dark"));

    // Écoute les modifications de la classe 'dark' sur l'élément <html>
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* Stockage indisponible (mode privé, etc.) */
    }
  };

  return { dark, toggleTheme };
}