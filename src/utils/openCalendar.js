import { trackEvent } from "@/utils/analytics";

export const SCHEDULE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3wx11wN9wr9kdE7TBGU3impXZ4_MkcsGh6NsUD7F854Fnr5XsJnsR2mnPQ-K1IFLGydbxR_KKZ?gv=true";

// Google owns the responsive booking experience. Top-level navigation
// avoids iframe restrictions and popup blockers; browser Back returns here.
export function openScheduleBooking() {
  window.location.assign(SCHEDULE_URL);
  trackEvent("calendar", "opened");
}
