import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Removes markdown formatting like **bold** or *italic* from text
 * and returns primitive plain text.
 */
export function stripMarkdown(text: string | null | undefined): string {
  if (!text) return "";
  let str = text.replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1');
  str = str.replace(/^#{1,6}\s*(.*)$/gm, '$1');
  str = str.replace(/`([^`]+)`/g, '$1');
  return str;
}
