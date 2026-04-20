"use client";

import { useEffect } from "react";

/**
 * SecurityGuard Component
 * Intercepts common developer tools shortcuts and right clicks to prevent easy skipping,
 * while allowing Ctrl+Shift+M for responsive design testing.
 */
export function SecurityGuard() {
  useEffect(() => {
    // Prevent Context Menu (Right Click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }

      // Ctrl+Shift+I / J
      if (isCtrlOrCmd && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j")) {
        e.preventDefault();
        return;
      }

      // Ctrl+U / Cmd+U (View Source)
      if (isCtrlOrCmd && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        return;
      }
      
      // Note: Ctrl+Shift+M (Device Toolbar) is implicitly allowed as it's not intercepted.
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
