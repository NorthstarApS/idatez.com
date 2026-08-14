type Props = {
  items: string[];
  selected?: string[];
  onToggle?: (value: string) => void;
  size?: "sm" | "md";
  ariaLabel?: string;
};

const InterestChips = ({ items, selected, onToggle, size = "md", ariaLabel }: Props) => {
  const pad = size === "sm" ? "px-2.5 py-1 text-xs" : "px-4 py-2.5 text-sm";

  if (!onToggle) {
    return (
      <ul className="flex flex-wrap gap-2" aria-label={ariaLabel}>
        {items.map((item) => (
          <li
            key={item}
            className={`border border-border bg-secondary font-medium text-secondary-foreground ${pad}`}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={ariaLabel}>
      {items.map((item) => {
        const active = selected?.includes(item);
        return (
          <button
            key={item}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(item)}
            className={`border font-medium transition-colors ${pad} ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-foreground hover:border-foreground"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default InterestChips;
