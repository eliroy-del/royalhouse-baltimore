type AnalyticsEvent =
  | "plan_visit_click"
  | "give_click"
  | "zelle_email_copied"
  | "connect_form_click"
  | "prayer_submit"
  | "event_register"
  | "social_click"
  | "phone_click"
  | "email_click"
  | "directions_click";

export function trackEvent(name: AnalyticsEvent, detail?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", name, detail ?? {});
  }
}
