import { Link } from "react-router-dom";

const Logo = ({ className = "" }: { className?: string }) => (
  <Link
    to="/"
    aria-label="iDatez forside"
    className={`font-display text-2xl font-extrabold tracking-[-0.04em] ${className}`}
  >
    iDate<span className="text-primary">z</span>
  </Link>
);

export default Logo;
