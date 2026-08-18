/**
 * Central brand configuration.
 * The frontend never hardcodes a single dating brand: every screen reads from
 * `brand` (the brand currently being served) and `brands` (the multi-brand
 * network a central profile can be shown on).
 *
 * A user has ONE central account/profile. Where that profile is visible is a
 * separate concern:  user -> profile -> site visibility
 */

export type BrandId = string;

export type VisibilityType = "free" | "premium";

export type BrandInfo = {
  id: BrandId;
  name: string;
  domain: string;
  tagline: string;
  description: string;
  /** Comes from the backend later. Frontend must NOT hardcode paywalls. */
  visibilityType: VisibilityType;
  /** Whether the current account may toggle this brand right now. */
  available: boolean;
};

export type BrandConfig = {
  id: BrandId;
  name: string;
  domain: string;
  tagline: string;
  subline: string;
  locale: string;
  features: {
    prompts: boolean;
    compatibility: boolean;
    verification: boolean;
    multiBrandVisibility: boolean;
    premium: boolean;
  };
};

export const brand: BrandConfig = {
  id: "partnerhub24",
  name: "PartnerHub24",
  domain: "partnerhub24.com",
  tagline: "Find mere end et match.",
  subline: "Mød mennesker, der leder efter det samme som dig.",
  locale: "da-DK",
  features: {
    prompts: true,
    compatibility: true,
    verification: true,
    multiBrandVisibility: true,
    premium: true,
  },
};

/**
 * Network brands. In production this list is returned by the API
 * (`GET /profile/site-visibility`) so new brands appear without a redesign.
 */
export const networkBrands: BrandInfo[] = [
  {
    id: "partnerhub24",
    name: "PartnerHub24",
    domain: "partnerhub24.com",
    tagline: "Find mere end et match.",
    description: "Find mennesker, der søger relationer og nye bekendtskaber.",
    visibilityType: "free",
    available: true,
  },
  {
    id: "idatez",
    name: "iDatez",
    domain: "idatez.com",
    tagline: "Mød nogen, der matcher dig.",
    description: "Et moderne datingcommunity med nye mennesker og matches.",
    visibilityType: "free",
    available: true,
  },
];

/** Shape the backend is expected to return for the signed-in account. */
export type SiteVisibility = Record<BrandId, boolean>;

export type AccountContext = {
  brand: BrandId;
  siteVisibility: SiteVisibility;
  subscription: { plan: "free" | "premium"; renewsAt?: string };
  permissions: { canToggleVisibility: BrandId[] };
};

export const defaultAccountContext: AccountContext = {
  brand: brand.id,
  siteVisibility: { partnerhub24: true, idatez: false },
  subscription: { plan: "free" },
  permissions: { canToggleVisibility: ["partnerhub24", "idatez"] },
};

/** Every API request carries brand context so one backend can serve all sites. */
export const brandHeaders = () => ({ "X-Brand": brand.id });
