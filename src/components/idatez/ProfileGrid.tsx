import { Profile } from "@/data/profiles";
import ProfileCard from "./ProfileCard";
import Reveal from "./Reveal";

type Props = {
  profiles: Profile[];
  onLike?: (p: Profile) => void;
  onSkip?: (p: Profile) => void;
  onSuperLike?: (p: Profile) => void;
};

const ProfileGrid = ({ profiles, onLike, onSkip, onSuperLike }: Props) => {
  if (profiles.length === 0) {
    return (
      <div className="card-sharp p-12 text-center">
        <h3 className="display-md">Ingen profiler matcher endnu</h3>
        <p className="mt-3 text-muted-foreground">
          Prøv at udvide afstanden eller fjerne et par filtre.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {profiles.map((profile, i) => (
        <Reveal key={profile.id} delay={Math.min(i * 0.06, 0.3)} className="h-full">
          <ProfileCard
            profile={profile}
            onLike={onLike}
            onSkip={onSkip}
            onSuperLike={onSuperLike}
          />
        </Reveal>
      ))}
    </div>
  );
};

export default ProfileGrid;
