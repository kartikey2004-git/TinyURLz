"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/theme-provider";
import {
  useModeAnimation,
  ThemeAnimationType,
} from "react-theme-switch-animation";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation hook configuration
  const { ref, toggleSwitchTheme } = useModeAnimation({
    isDarkMode: theme === "dark",
    onDarkModeChange: (newDarkMode) => {
      // Override library's internal state with your theme system
      const newTheme = newDarkMode ? "dark" : "light";
      setTheme(newTheme);
    },
    animationType: ThemeAnimationType.BLUR_CIRCLE,
    duration: 750,
    blurAmount: 3,
    globalClassName: "dark",
    pseudoElement: "::view-transition-new(root)",
  });

  const handleThemeToggle = () => {
    // Use the library's toggle function which triggers animation
    toggleSwitchTheme();
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-md border border-border/50"
        disabled
      >
        <div className="h-[1.2rem] w-[1.2rem] animate-pulse bg-muted rounded" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      className="h-9 w-9 rounded-md border border-border/50 transition-all hover:scale-105 active:scale-95"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
