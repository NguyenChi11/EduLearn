export const formatMinutes = (minutes: number): string => {
  if (minutes <= 0) return "0 phút";
  if (minutes < 60) return `${minutes} phút`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (rest === 0) return `${hours} giờ`;
  return `${hours} giờ ${rest} phút`;
};


