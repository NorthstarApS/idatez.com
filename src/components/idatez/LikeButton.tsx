import { useState } from "react";
import { Heart } from "lucide-react";

type Props = {
  onLike?: () => void;
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
};

const LikeButton = ({ onLike, label = "Like", variant = "solid", className = "" }: Props) => {
  const [burst, setBurst] = useState(false);

  const handle = () => {
    setBurst(true);
    window.setTimeout(() => setBurst(false), 500);
    onLike?.();
  };

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={label}
      className={`tap-target relative inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition-colors ${
        variant === "solid"
          ? "bg-primary text-primary-foreground hover:bg-primary-soft"
          : "border border-border bg-surface text-foreground hover:border-primary hover:text-primary"
      } ${className}`}
    >
      <Heart
        className={`h-5 w-5 ${burst ? "animate-heart-pop fill-current" : ""}`}
        aria-hidden="true"
      />
      <span>{label}</span>
    </button>
  );
};

export default LikeButton;
