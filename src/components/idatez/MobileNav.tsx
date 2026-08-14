import { NavLink } from "react-router-dom";
import { Flame, Heart, Sparkles, MessageCircle, User } from "lucide-react";

const ITEMS = [
  { to: "/discover", label: "Discover", Icon: Flame },
  { to: "/likes", label: "Likes", Icon: Heart },
  { to: "/matches", label: "Matches", Icon: Sparkles },
  { to: "/messages", label: "Chat", Icon: MessageCircle },
  { to: "/profile/emma", label: "Profil", Icon: User },
];

const MobileNav = () => (
  <nav
    aria-label="Appnavigation"
    className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur lg:hidden"
  >
    <ul className="flex items-stretch">
      {ITEMS.map(({ to, label, Icon }) => (
        <li key={to} className="flex-1">
          <NavLink
            to={to}
            className={({ isActive }) =>
              `flex min-h-14 flex-col items-center justify-center gap-1 py-2 text-[11px] font-semibold ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default MobileNav;
