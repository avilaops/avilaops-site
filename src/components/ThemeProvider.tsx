"use client";

import { createContext, useContext } from "react";

import { useTema } from "@/lib/tema-noturno/react";
import type { ModoTema, Tema } from "@/lib/tema-noturno";

/**
 * O tema do site segue o relógio: das 18h às 6h fica escuro. O botão do header
 * continua existindo para quem quiser o contrário agora — a escolha vale até a
 * próxima virada e depois o automático reassume sozinho.
 *
 * A regra em si mora em `@/lib/tema-noturno`, que é o mesmo arquivo rodando no
 * app.avilaops.com, no webmail, no Comandeiro e no ERP.
 */

type Theme = Tema;

interface ThemeContextValue {
  theme: Theme;
  /** "auto" enquanto o horário manda; senão o tema fixado até a próxima virada. */
  mode: ModoTema;
  toggleTheme: () => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  mode: "auto",
  toggleTheme: () => {},
  resetTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { tema, modo, alternar, voltarAoAutomatico } = useTema();

  return (
    <ThemeContext.Provider
      value={{
        theme: tema,
        mode: modo,
        toggleTheme: alternar,
        resetTheme: voltarAoAutomatico,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
