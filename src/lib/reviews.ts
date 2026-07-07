/**
 * The clinic's Google reviews — single source used by the homepage flythrough
 * and the ReviewStrip component on interior pages. All quotes are verbatim
 * from public Google reviews. Update here when new reviews come in.
 */

export const GOOGLE_REVIEWS_URL = "https://share.google/A5V615VuXhaDQytso";
export const GOOGLE_RATING = "5.0";
export const GOOGLE_REVIEW_COUNT = 6;

export type Review = { quote: string; name: string };

export const GOOGLE_REVIEWS: Review[] = [
  { quote: "We had such a great experience with Logan! Our toddler woke up in the middle of a Saturday night with croup. Logan came to our living room, conducted an exam, and got him rolling on meds quickly. Everything you hope for from a medical provider.", name: "Samuel S." },
  { quote: "When my daughter was sick, their concierge team came directly to our home and took such amazing care of her. They were prompt, professional, and incredibly thorough. They didn't rush, they explained everything, and they followed up afterward.", name: "Sheena S." },
  { quote: "Such a great primary care experience! Providers that truly take the time to ask in-depth questions and seem compassionate and invested. I never feel rushed, and I always leave feeling confident about my care plan. Highly recommend!", name: "Jozlyn G." },
  { quote: "Logan took his time, dove into my issue, ordered relevant labs, reviewed my medical history, nutrition, lifestyle, and goals, and built a treatment plan that has already given me positive results. Highly recommend!", name: "Michael R." },
  { quote: "The care feels genuinely personal, with unrushed visits, thoughtful follow-ups, and quick, easy communication. Logan truly listened and showed real professionalism. I always feel cared for like a human, not a time slot.", name: "Carley H." },
];
