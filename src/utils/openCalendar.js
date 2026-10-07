import { trackEvent } from "@/utils/analytics";

export const SCHEDULE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3wx11wN9wr9kdE7TBGU3impXZ4_MkcsGh6NsUD7F854Fnr5XsJnsR2mnPQ-K1IFLGydbxR_KKZ?gv=true";

// All entry points use the shared in-page booking dialog, without a new window.
export function openScheduleBooking() {
  window.dispatchEvent(new CustomEvent("openScheduleBooking"));
  trackEvent("calendar", "opened");
}
