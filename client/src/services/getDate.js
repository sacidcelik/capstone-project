export default function getTodaysDate() {
  const today = new Date();
  const dateToday = String(today.getDate()).padStart(2, '0');
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  const currentYear = today.getFullYear();
  return dateToday + '.' + currentMonth + '.' + currentYear;
}
