import { BadgeCheck } from "lucide-react";

type Props = { label?: string; className?: string };

const VerificationBadge = ({ label = "Verificeret", className = "" }: Props) => (
  <span
    className={`inline-flex items-center gap-1 bg-primary px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground ${className}`}
  >
    <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
    {label}
  </span>
);

export default VerificationBadge;
