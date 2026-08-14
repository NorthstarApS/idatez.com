import { useState } from "react";
import SiteLayout from "@/components/idatez/SiteLayout";
import ProfileGrid from "@/components/idatez/ProfileGrid";
import MatchModal from "@/components/idatez/MatchModal";
import { Profile, profiles } from "@/data/profiles";
import { toast } from "@/hooks/use-toast";

const Likes = () => {
  const [match, setMatch] = useState<Profile | null>(null);

  return (
    <SiteLayout>
      <div className="container-wide py-10 md:py-14">
        <p className="eyebrow">Likes</p>
        <h1 className="display-lg mt-2">De har liket dig</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Like tilbage for at åbne en samtale. Ingen ser dine valg, før det er gensidigt.
        </p>
        <div className="mt-12">
          <ProfileGrid
            profiles={profiles.slice(2)}
            onLike={(p) => setMatch(p)}
            onSuperLike={(p) => toast({ title: `Super like sendt til ${p.name} ⭐` })}
          />
        </div>
      </div>
      <MatchModal profile={match} onClose={() => setMatch(null)} />
    </SiteLayout>
  );
};

export default Likes;
