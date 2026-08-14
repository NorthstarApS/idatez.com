import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const NAV = [
  { label: "Opdag", to: "/discover" },
  { label: "Matches", to: "/matches" },
  { label: "Beskeder", to: "/messages" },
  { label: "Om iDatez", to: "/about" },
  { label: "Sikkerhed", to: "/safety" },
];

const Header = ({ overHero = false }: { overHero?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const transparent = overHero && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        transparent
          ? "bg-transparent text-ink-foreground"
          : "border-b border-border bg-background/95 text-foreground backdrop-blur"
      }`}
    >
      <div className="container-wide flex h-16 items-center justify-between md:h-20">
        <Logo />

        <nav aria-label="Hovednavigation" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-opacity hover:opacity-70 ${
                  isActive ? "text-primary" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost" className="tap-target font-semibold">
            <Link to="/messages">Log ind</Link>
          </Button>
          <Button asChild className="tap-target bg-primary px-6 font-semibold hover:bg-primary-soft">
            <Link to="/onboarding">Opret profil</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Button asChild variant="ghost" size="icon" className="tap-target" aria-label="Min profil">
            <Link to="/profile/emma">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="tap-target"
            aria-label={open ? "Luk menu" : "Åbn menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-in border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobilnavigation" className="container-wide flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex min-h-11 items-center border-b border-border/60 py-3 text-base font-semibold text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-5 h-12 bg-primary font-semibold hover:bg-primary-soft">
              <Link to="/onboarding">Opret gratis profil</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
