import { conversations, getProfile } from "@/data/profiles";

type Props = {
  activeId: string;
  onSelect: (id: string) => void;
};

const ChatList = ({ activeId, onSelect }: Props) => (
  <ul className="divide-y divide-border" aria-label="Samtaler">
    {conversations.map((c) => {
      const profile = getProfile(c.profileId);
      if (!profile) return null;
      const last = c.messages[c.messages.length - 1];
      const active = activeId === c.id;
      return (
        <li key={c.id}>
          <button
            type="button"
            onClick={() => onSelect(c.id)}
            aria-current={active}
            className={`flex w-full items-center gap-4 px-4 py-4 text-left transition-colors ${
              active ? "bg-accent" : "hover:bg-secondary"
            }`}
          >
            <span className="relative shrink-0">
              <img
                src={profile.photos[0]}
                alt=""
                loading="lazy"
                className="h-14 w-14 object-cover"
              />
              {profile.online && (
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 border-2 border-surface bg-success"
                  aria-hidden="true"
                />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="truncate font-display text-base font-bold">{profile.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{c.lastActive}</span>
              </span>
              <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                {last?.from === "me" ? "Du: " : ""}
                {last?.text}
              </span>
            </span>
            {c.unread > 0 && (
              <span className="flex h-6 min-w-6 items-center justify-center bg-primary px-1.5 text-xs font-bold text-primary-foreground">
                {c.unread}
              </span>
            )}
          </button>
        </li>
      );
    })}
  </ul>
);

export default ChatList;
