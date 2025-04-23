import { format } from "date-fns";

function formatDate(date: string): string {
  try {
    return format(date, "yyyy-MM-dd")
  } catch (e) {
    console.error(e)
    return date;
  }
}

export default formatDate;
