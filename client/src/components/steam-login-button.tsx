import React from "react";
import { SiSteam } from "react-icons/si";
import { Button } from "@/components/ui/button";

interface SteamLoginButtonProps {
  className?: string;
  variant?: "default" | "large";
}

export function SteamLoginButton({ className, variant = "default" }: SteamLoginButtonProps) {
  return (
    <Button
      className={`bg-[#1b2838] hover:bg-[#2a475e] border-0 flex items-center justify-center gap-2 transition-all ${
        variant === "large" ? "py-6 px-8 text-lg" : "py-2 px-4"
      } ${className}`}
      onClick={() => {
        // Redirecionando para a porta 3001 (desenvolvimento local)
        window.location.href = "http://localhost:3001/api/auth/steam";
      }}
    >
      <SiSteam className={variant === "large" ? "h-6 w-6" : "h-5 w-5"} />
      <span>Entrar com Steam</span>
    </Button>
  );
}