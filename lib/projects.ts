// Real, dated field reports. The "Recent planting days" block on /our-work only
// appears when this list has entries, so nothing invented ever shows on the site.
export type FieldReport = {
  date: string; // e.g. "2026-09-12"
  place: string;
  title: string;
  summary: string;
};

export const fieldReports: FieldReport[] = [];
