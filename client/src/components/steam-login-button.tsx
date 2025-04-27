
import React from "react";
import { Button } from "@/components/ui/button";

interface SteamLoginButtonProps {
  className?: string;
  variant?: "default" | "large";
}

export function SteamLoginButton({ className, variant = "default" }: SteamLoginButtonProps) {
  return (
    <Button
      className={`bg-[#1b2838] hover:bg-[#2a475e] flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#1b2838]/20 ${
        variant === "large" ? "py-7 px-10 text-xl font-semibold" : "py-3 px-5 text-lg font-medium"
      } ${className}`}
      onClick={() => {
        window.location.href = `/api/auth/steam`;
      }}
    >
      <img src="/steam-icon.png" alt="Steam" className={variant === "large" ? "h-6 w-6" : "h-5 w-5"} />
      <span>Entrar com Steam</span>
    </Button>
  );
}
