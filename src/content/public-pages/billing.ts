/**
 * Billing facts taken from this frontend only.
 *
 * Verified in UI copy (Home, About, Header, Onboarding CTAs):
 * a profile can be created without payment ("Opret gratis profil").
 *
 * Not present anywhere in this repo: PLUS, DATEZ+, 29 kr, 49 kr,
 * or other paid plan amounts. Do not invent them on public pages.
 */
export const BILLING_FROM_CODE = {
  profileCreationIsFree: true,
  plusMonthlyDkk: null,
  datezPlusMonthlyDkk: null,
  ctaLabel: "Opret gratis profil",
  ctaPath: "/onboarding",
} as const;

export const FREE_PROFILE_LINE =
  "Det er gratis at oprette en profil. Sådan står det i iDatez, og vi skriver ikke priser, der ikke findes i produktet.";
