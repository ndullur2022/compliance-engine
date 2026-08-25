"use client";
import { Theme } from "@twilio-paste/core/theme";

export function PasteProvider({ children }: { children: React.ReactNode }) {
  return <Theme.Provider theme="default">{children}</Theme.Provider>;
}
