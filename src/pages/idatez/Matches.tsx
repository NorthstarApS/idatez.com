import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import SiteLayout from "@/components/idatez/SiteLayout";
import Reveal from "@/components/idatez/Reveal";
import VerificationBadge from "@/components/idatez/VerificationBadge";
import { Profile, profiles } from "@/data/profiles";

const Section = ({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: Profile[];
}) => (
  <section className="mt-16 first:mt-0" aria-labelledby={`sec-${title}`}>
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 id={`sec-${title}`} className="display-md">
          {title}
        </h2>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
      <span className="text-sm font-semibold text-muted-foreground">{items.length} profiler</span>
    </div>
    <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {items.map((p, i) => (
        <Reveal key={p.id} delay={Math.min(i * 0.05, 0.25)}>
          <li className="group relative overflow-hidden">
            <Link to={`/profile/${p.id}`} aria-label={`Åbn ${p.name}s profil`}>
              <img
                src={p.photos[0]}
                alt={`${p.name}, ${p.age}`}
                loading="lazy"
                width={768}
                height={1024}
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="veil pointer-events-none absolute inset-0" aria-hidden="true" />
              <span className="absolute inset-x-0 bottom-0 p-4">
                <span className="block font-display text-lg font-bold text-ink-foreground">
                  {p.name}, {p.age}
                </span>
                <span className="text-sm text-ink-foreground/80">{p.city}</span>
              </span>
              {p.verified && <VerificationBadge className="absolute left-3 top-3" label="OK" />}
            </Link>
            <Link
              to="/messages"
              aria-label={`Skriv til ${p.name}`}
              className="tap-target absolute right-3 top-3 flex items-center justify-center bg-surface/90 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </Link>
          </li>
        </Reveal>
      ))}
    </ul>
  </section>
);

const Matches = () => (
  <SiteLayout>
    <div className="container-wide py-10 md:py-14">
      <p className="eyebrow">Matches</p>
      <h1 className="display-lg mt-2">Dem der også sagde ja</h1>

      <div className="mt-12">
        <Section
          title="Nye matches"
          description="I har liket hinanden – start samtalen."
          items={profiles.slice(0, 3)}
        />
        <Section
          title="Seneste likes"
          description="Profiler der har liket dig."
          items={profiles.slice(3, 6)}
        />
        <Section
          title="Profiler du har liket"
          description="Vi giver dig besked, hvis de liker tilbage."
          items={profiles.slice(1, 5)}
        />
      </div>
    </div>
  </SiteLayout>
);

export default Matches;
