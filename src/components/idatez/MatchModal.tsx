import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Profile } from "@/data/profiles";
import p1 from "@/assets/p1.jpg";

type Props = {
  profile: Profile | null;
  onClose: () => void;
};

const MatchModal = ({ profile, onClose }: Props) => (
  <Dialog open={!!profile} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="max-w-lg border-border bg-surface p-0">
      {profile && (
        <div className="animate-scale-in">
          <div className="bg-gradient-primary px-8 py-10 text-center">
            <p className="eyebrow text-primary-foreground/80">Det er gensidigt</p>
            <DialogTitle className="mt-2 font-display text-4xl font-extrabold text-primary-foreground">
              It's a match!
            </DialogTitle>
            <DialogDescription className="mt-2 text-primary-foreground/90">
              Du og {profile.name} har liket hinanden.
            </DialogDescription>
            <div className="mt-8 flex items-center justify-center gap-4">
              <img
                src={p1}
                alt="Dit profilbillede"
                loading="lazy"
                width={768}
                height={1024}
                className="h-28 w-24 border-2 border-primary-foreground object-cover"
              />
              <img
                src={profile.photos[0]}
                alt={`${profile.name}s profilbillede`}
                loading="lazy"
                width={768}
                height={1024}
                className="h-28 w-24 border-2 border-primary-foreground object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 p-6">
            <Button asChild className="h-12 bg-primary font-semibold hover:bg-primary-soft">
              <Link to="/messages" onClick={onClose}>
                Send en besked
              </Link>
            </Button>
            <Button variant="outline" className="h-12 font-semibold" onClick={onClose}>
              Fortsæt med at udforske
            </Button>
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
);

export default MatchModal;
