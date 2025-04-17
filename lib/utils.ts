export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)

  // Format date: Apr 15, 2023
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
  const formattedDate = date.toLocaleDateString("en-US", dateOptions)

  // Format time: 8:00 PM
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions)

  return `${formattedDate} • ${formattedTime}`
}

export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
