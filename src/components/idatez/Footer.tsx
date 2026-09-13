import { Link } from "react-router-dom";
import Logo from "./Logo";

const COLUMNS = [
  {
    title: "iDatez",
    links: [
      { label: "Om os", to: "/about" },
      { label: "Karriere", to: "/about" },
      { label: "Presse", to: "/about" },
    ],
  },
  {
    title: "Udforsk",
    links: [
      { label: "Dating", to: "/dating" },
      { label: "Datingapp", to: "/datingapp" },
      { label: "Singler", to: "/singler" },
      { label: "Gratis dating app", to: "/gratis-dating-app" },
      { label: "Datingprofil", to: "/datingprofil" },
      { label: "Dating i virkeligheden", to: "/dating-i-virkeligheden" },
    ],
  },
  {
    title: "Hjælp",
    links: [
      { label: "Kontakt", to: "/safety" },
      { label: "FAQ", to: "/dating" },
      { label: "Sikkerhed", to: "/safety" },
      { label: "Datingtips", to: "/datingprofil" },
    ],
  },
  {
    title: "Juridisk",
    links: [
      { label: "Vilkår", to: "/safety" },
      { label: "Privatlivspolitik", to: "/safety" },
      { label: "Cookies", to: "/safety" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Retningslinjer", to: "/safety" },
      { label: "Rapportér bruger", to: "/safety" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-border bg-surface">
    <div className="container-wide grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <div className="lg:col-span-1">
        <Logo />
        <p className="mt-4 max-w-xs text-sm text-muted-foreground">
          Dating med færre spil og flere rigtige samtaler.
        </p>
      </div>
      {COLUMNS.map((col) => (
        <nav key={col.title} aria-label={col.title}>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em]">{col.title}</h2>
          <ul className="mt-4 space-y-3">
            {col.links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="inline-flex min-h-8 items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
    <div className="border-t border-border">
      <div className="container-wide flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} iDatez · Viniko · CVR 44072122</p>
        <p>Lavet i København</p>
      </div>
    </div>
  </footer>
);

export default Footer;
