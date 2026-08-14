import { Link, useParams } from "react-router-dom";
import { MapPin, MessageCircle, Ruler, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/idatez/SiteLayout";
import Reveal from "@/components/idatez/Reveal";
import InterestChips from "@/components/idatez/InterestChips";
import VerificationBadge from "@/components/idatez/VerificationBadge";
import LikeButton from "@/components/idatez/LikeButton";
import { getProfile, profiles } from "@/data/profiles";
import { toast } from "@/hooks/use-toast";

const ProfileDetail = () => {
  const { id } = useParams();
  const profile = getProfile(id);

  if (!profile) {
    return (
      <SiteLayout>
        <div className="container-wide py-24 text-center">
          <h1 className="display-md">Profilen findes ikke</h1>
          <Button asChild className="mt-8 h-12 bg-primary font-semibold hover:bg-primary-soft">
            <Link to="/discover">Tilbage til Discover</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  const others = profiles.filter((p) => p.id !== profile.id).slice(0, 3);

  return (
    <SiteLayout>
      <div className="container-wide py-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div className="relative">
              <img
                src={profile.photos[0]}
                alt={`${profile.name}, ${profile.age} år`}
                width={768}
                height={1024}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute left-4 top-4 flex gap-2">
                {profile.verified && <VerificationBadge />}
                {profile.online && (
                  <span className="inline-flex items-center gap-1.5 bg-ink/80 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-foreground">
                    <span className="h-1.5 w-1.5 bg-success" aria-hidden="true" />
                    Online
                  </span>
                )}
              </div>
            </div>
          </Reveal>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.05}>
              <h1 className="display-lg">
                {profile.name}, {profile.age}
              </h1>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {profile.city} · {profile.distanceKm} km væk
                </span>
                <span>{profile.pronouns}</span>
                <span>{profile.orientation}</span>
              </p>

              <section className="mt-10">
                <h2 className="eyebrow">Om mig</h2>
                <p className="mt-3 text-lg leading-relaxed">{profile.bio}</p>
              </section>

              <section className="mt-10">
                <h2 className="eyebrow">Interesser</h2>
                <div className="mt-4">
                  <InterestChips items={profile.interests} ariaLabel="Interesser" />
                </div>
              </section>

              <section className="mt-10">
                <h2 className="eyebrow">Søger</h2>
                <p className="mt-3 inline-flex bg-accent px-4 py-2 font-semibold text-accent-foreground">
                  {profile.looking}
                </p>
              </section>

              <section className="mt-10">
                <h2 className="eyebrow">Livsstil</h2>
                <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
                  {profile.lifestyle.map((item) => (
                    <div key={item.label} className="border-t border-border pt-3">
                      <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                        {item.label}
                      </dt>
                      <dd className="mt-1 font-semibold">{item.value}</dd>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3">
                    <dt className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
                      <Ruler className="h-3.5 w-3.5" aria-hidden="true" /> Højde
                    </dt>
                    <dd className="mt-1 font-semibold">{profile.height} cm</dd>
                  </div>
                  <div className="border-t border-border pt-3">
                    <dt className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
                      <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" /> Uddannelse
                    </dt>
                    <dd className="mt-1 font-semibold">{profile.education}</dd>
                  </div>
                </dl>
              </section>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <LikeButton
                  className="flex-1 py-4 text-base"
                  label={`Like ${profile.name}`}
                  onLike={() => toast({ title: `Du likede ${profile.name}` })}
                />
                <Button
                  asChild
                  variant="outline"
                  className="h-14 flex-1 border-foreground text-base font-semibold"
                >
                  <Link to="/messages">
                    <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                    Send besked
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <section className="mt-20" aria-labelledby="more-heading">
          <h2 id="more-heading" className="display-md">
            Andre du måske kan møde
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {others.map((p) => (
              <li key={p.id}>
                <Link to={`/profile/${p.id}`} className="group block overflow-hidden">
                  <img
                    src={p.photos[0]}
                    alt={`${p.name}, ${p.age}`}
                    loading="lazy"
                    width={768}
                    height={1024}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <p className="mt-3 flex items-center gap-2 font-display text-lg font-bold">
                    {p.name}, {p.age}
                    <Heart className="h-4 w-4 text-primary" aria-hidden="true" />
                  </p>
                  <p className="text-sm text-muted-foreground">{p.city}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SiteLayout>
  );
};

export default ProfileDetail;
