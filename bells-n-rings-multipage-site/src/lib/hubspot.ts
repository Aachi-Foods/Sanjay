// HubSpot's tracking code (loaded site-wide in layout.tsx) exposes a queue
// on window._hsq — the same async-queue pattern as most analytics scripts
// (push calls before the script itself has loaded; it drains the queue once
// it has). `identify` is the tracking-code method for associating submitted
// form data with a HubSpot contact, creating one if it doesn't exist yet —
// used here instead of the separate Forms API since that needs a form GUID
// from a form built in HubSpot, which this site doesn't have.
//
// Unrecognised property names are silently ignored by HubSpot rather than
// erroring, so passing event_date/event_type/message alongside the standard
// email/firstname/lastname/phone is safe even before those custom contact
// properties (if wanted) exist in the portal.
declare global {
  interface Window {
    _hsq?: unknown[][];
  }
}

export function identifyToHubSpot(properties: Record<string, string | undefined>) {
  if (typeof window === "undefined") return;
  window._hsq = window._hsq || [];
  window._hsq.push(["identify", properties]);
  // identify only stages the data locally; a tracked page view is what
  // actually syncs it to HubSpot (documented HubSpot tracking-code behavior).
  window._hsq.push(["trackPageView"]);
}
