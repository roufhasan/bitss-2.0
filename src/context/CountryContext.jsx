"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CountryContext = createContext(null);

export function CountryProvider({ children }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hasChosen, setHasChosen] = useState(false);

  // On mount, check if user already chose a country (persisted in localStorage)
  useEffect(() => {
    const stored = localStorage.getItem("bitss_country");
    if (stored) {
      try {
        setSelectedCountry(JSON.parse(stored));
        setHasChosen(true);
      } catch {
        localStorage.removeItem("bitss_country");
      }
    }
  }, []);

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setHasChosen(true);
    localStorage.setItem("bitss_country", JSON.stringify(country));
  };

  const resetCountry = () => {
    setSelectedCountry(null);
    setHasChosen(false);
    localStorage.removeItem("bitss_country");
  };

  return (
    <CountryContext.Provider
      value={{ selectedCountry, hasChosen, selectCountry, resetCountry }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used inside CountryProvider");
  return ctx;
}
