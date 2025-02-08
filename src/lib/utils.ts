import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const formatter = new Intl.DateTimeFormat('en-US', {
  year: "numeric",
  month: "long",
  day: "numeric",
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatTime(dateString: string) {
  const d = new Date(dateString)
  return formatter.format(d)
}
