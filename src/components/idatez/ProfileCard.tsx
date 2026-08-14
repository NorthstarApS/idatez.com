import { Link } from "react-router-dom";
import { MapPin, Heart, X, Star } from "lucide-react";
import { Profile } from "@/data/profiles";
import VerificationBadge from "./VerificationBadge";

type Props = {
  profile: Profile;
  onLike?: (p: Profile) => void;
  onSkip?: (p: Profile) => void;
  onSuperLike?: (p: Profile) => void;
  showActions?: boolean;
};

const ProfileCard = ({ profile, onLike, onSkip, onSuperLike, showActions = true }: Props) => (
  <article className="group card-sharp flex h-full flex-col overflow-hidden">
    <Link
      to={`/profile/${profile.id}`}
      className="relative block overflow-hidden"
      aria-label={`Åbn ${profile.name}s profil`}
    >
      <img
        src={profile.photos[0]}
        alt={`${profile.name}, ${profile.age} år, ${profile.city}`}
        loading="lazy"
        width={768}
        height={1024}
        className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="veil pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        {profile.verified && <VerificationBadge />}
        {profile.online && (
          <span className="inline-flex items-center gap-1.5 bg-ink/80 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-foreground">
            <span className="h-1.5 w-1.5 bg-success" aria-hidden="true" />
            Online
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
        <h3 className="font-display text-2xl font-bold text-ink-foreground">
          {profile.name}, {profile.age}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-foreground/85">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {profile.city} · {profile.distanceKm} km
        </p>
      </div>
    </Link>

    <div className="flex flex-1 flex-col gap-4 p-5">
      <p className="text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>
      <ul className="flex flex-wrap gap-2" aria-label="Interesser">
        {profile.interests.slice(0, 4).map((i) => (
          <li key={i} className="border border-border bg-secondary px-2.5 py-1 text-xs font-medium">
            {i}
          </li>
        ))}
      </ul>

      {showActions && (
        <div className="mt-auto flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => onSkip?.(profile)}
            aria-label={`Skip ${profile.name}`}
            className="tap-target flex flex-1 items-center justify-center border border-border bg-surface transition-colors hover:border-foreground"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onSuperLike?.(profile)}
            aria-label={`Super like ${profile.name}`}
            className="tap-target flex flex-1 items-center justify-center border border-premium/40 bg-premium/10 text-premium transition-colors hover:bg-premium/20"
          >
            <Star className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onLike?.(profile)}
            aria-label={`Like ${profile.name}`}
            className="tap-target flex flex-[2] items-center justify-center gap-2 bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-soft"
          >
            <Heart className="h-5 w-5" aria-hidden="true" />
            Like
          </button>
        </div>
      )}
    </div>
  </article>
);

export default ProfileCard;
