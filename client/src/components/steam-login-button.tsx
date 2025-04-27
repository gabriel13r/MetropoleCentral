
import React from "react";
import { SiDiscord } from "react-icons/si";
import { Button } from "@/components/ui/button";

interface DiscordLoginButtonProps {
  className?: string;
  variant?: "default" | "large";
}

export function DiscordLoginButton({ className, variant = "default" }: DiscordLoginButtonProps) {
  return (
    <Button
      className={`bg-[#5865F2] hover:bg-[#4752C4] flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#5865F2]/20 ${
        variant === "large" ? "py-7 px-10 text-xl font-semibold" : "py-3 px-5 text-lg font-medium"
      } ${className}`}
      onClick={() => {
        window.location.href = `/api/auth/discord`;
      }}
    >
      <SiDiscord className={variant === "large" ? "h-6 w-6" : "h-5 w-5"} />
      <span>Entrar com Discord</span>
    </Button>
  );
}
