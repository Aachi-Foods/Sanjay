"use client";

// One scroll listener for the whole page.
//
// Every scroll-linked effect here registers a callback instead of adding its
// own listener, and they are all flushed together inside a single
// requestAnimationFrame. A dozen components each attaching their own
// handler means a dozen callbacks racing on every scroll event and a dozen
// separate layout reads; this way the browser does one frame of work.
type Tick = () => void;

const subscribers = new Set<Tick>();
let frame = 0;
let listening = false;

function flush() {
  frame = 0;
  for (const fn of subscribers) fn();
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(flush);
}

export function onScrollTick(fn: Tick): () => void {
  subscribers.add(fn);
  fn(); // place the element correctly before the first scroll

  if (!listening) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    listening = true;
  }

  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0 && listening) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      listening = false;
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }
  };
}

// How far an element has travelled across the viewport: 0 as its top enters
// from below, 0.5 as it sits centred, 1 as its bottom clears the top.
export function viewportProgress(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const total = rect.height + vh;
  return Math.min(1, Math.max(0, (vh - rect.top) / total));
}
