import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Lock, ShieldCheck, UserCheck, BadgeCheck, Mail, Smartphone, ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/idatez/SiteLayout";
import MatchSearch from "@/components/idatez/MatchSearch";
import ProfileGrid from "@/components/idatez/ProfileGrid";
import MatchModal from "@/components/idatez/MatchModal";
import Reveal from "@/components/idatez/Reveal";
import SafetyCard from "@/components/idatez/SafetyCard";
import { Profile, profiles } from "@/data/profiles";
import hero from "@/assets/hero.jpg";
import story1 from "@/assets/story1.jpg";
import story2 from "@/assets/story2.jpg";

const STEPS = [
  { n: "01", title: "Opret din profil", text: "Otte hurtige spørgsmål. Ingen endeløse formularer." },
  { n: "02", title: "Find personer, der matcher dig", text: "Filtre der faktisk virker – alder, afstand, intentioner." },
  { n: "03", title: "Start en samtale", text: "Match, skriv og mød hinanden i den virkelige verden." },
];

const SAFETY = [
  { Icon: BadgeCheck, title: "Profilverificering", description: "Selfie- og telefonverificering giver dig sikkerhed for, at personen er ægte." },
  { Icon: ShieldCheck, title: "Moderation", description: "Vores team gennemgår anmeldelser hurtigt og handler konsekvent." },
  { Icon: UserCheck, title: "Rapportering & blokering", description: "Blokér eller rapportér i to tryk – uden at personen får det at vide." },
  { Icon: Lock, title: "Privatlivskontrol", description: "Du bestemmer hvad der vises. Vi deler aldrig din præcise position." },
];

const Home = () => {
  const [match, setMatch] = useState<Profile | null>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 90]);

  return (
    <SiteLayout overHero>
      {/* HERO */}
      <section className="relative min-h-[90vh] overflow-hidden bg-ink">
        <motion.img
          src={hero}
          alt="To mennesker griner sammen på en fortovscafé i byen"
          width={1600}
          height={1200}
          style={{ y: heroY }}
          className="absolute inset-0 h-[112%] w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20"
          aria-hidden="true"
        />
        <div className="container-wide relative flex min-h-[90vh] flex-col justify-end pb-14 pt-32 md:justify-center md:pb-24">
          <div className="max-w-3xl">
            <motion.p
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow text-ink-foreground/70"
            >
              Dating uden støj
            </motion.p>
            <motion.h1
              initial={reduce ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl mt-4 text-ink-foreground"
            >
              Mød nogen, der<br />matcher dig.
            </motion.h1>
            <motion.p
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-ink-foreground/85 md:text-xl"
            >
              Find nye mennesker, dates og relationer – på dine præmisser.
            </motion.p>
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild className="h-14 bg-primary px-8 text-base font-semibold hover:bg-primary-soft">
                <Link to="/discover">Find matches</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 border-ink-foreground/40 bg-transparent px-8 text-base font-semibold text-ink-foreground hover:bg-ink-foreground hover:text-ink"
              >
                <Link to="/onboarding">Opret gratis profil</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 max-w-4xl"
          >
            <MatchSearch />
          </motion.div>
        </div>
      </section>

      {/* DISCOVER PREVIEW */}
      <section className="container-wide py-20 md:py-28" aria-labelledby="discover-heading">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Discover</p>
            <h2 id="discover-heading" className="display-lg mt-3 max-w-xl">
              Mennesker i nærheden af dig lige nu
            </h2>
          </div>
          <Button asChild variant="ghost" className="h-12 font-semibold text-primary">
            <Link to="/discover">
              Se alle profiler <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>

        <div className="mt-12">
          <ProfileGrid profiles={profiles.slice(0, 3)} onLike={(p) => setMatch(p)} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary py-20 md:py-28" aria-labelledby="how-heading">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">Sådan fungerer det</p>
            <h2 id="how-heading" className="display-lg mt-3 max-w-2xl">
              Tre trin fra profil til første date
            </h2>
          </Reveal>
          <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.12}>
                <li className="border-t-2 border-foreground pt-6">
                  <span className="font-display text-6xl font-extrabold tracking-tighter text-primary md:text-7xl">
                    {step.n}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-muted-foreground">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* STORY 1 */}
      <section className="container-wide grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
        <Reveal>
          <img
            src={story1}
            alt="Par går over en bro i byen i skumringen"
            loading="lazy"
            width={1200}
            height={1200}
            className="aspect-square w-full object-cover"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Kvalitet frem for mængde</p>
          <h2 className="display-lg mt-4">Mindre scrolling.<br />Flere rigtige samtaler.</h2>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            iDatez viser dig færre, men bedre profiler. Vi prioriterer mennesker med samme
            intentioner som dig – ikke dem der swiper mest.
          </p>
          <Button asChild className="mt-8 h-14 bg-ink px-8 py-4 font-semibold text-ink-foreground hover:bg-ink/90">
            <Link to="/discover">Se dine forslag</Link>
          </Button>
        </Reveal>
      </section>

      {/* STORY 2 */}
      <section className="container-wide grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
        <Reveal className="md:order-2">
          <img
            src={story2}
            alt="Kvinde smiler til sin telefon i et lyst køkken"
            loading="lazy"
            width={1200}
            height={1200}
            className="aspect-square w-full object-cover"
          />
        </Reveal>
        <Reveal delay={0.1} className="md:order-1">
          <p className="eyebrow">Dine præmisser</p>
          <h2 className="display-lg mt-4">Du bestemmer tempoet.</h2>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Sig hvad du leder efter – fra venskab til seriøst forhold. Vi respekterer det, og din
            profil viser det tydeligt fra første sekund.
          </p>
        </Reveal>
      </section>

      {/* SAFETY */}
      <section className="bg-ink py-20 text-ink-foreground md:py-28" aria-labelledby="safety-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-ink-foreground/60">Trust &amp; Safety</p>
            <h2 id="safety-heading" className="display-lg mt-3">
              Dating skal føles trygt.
            </h2>
            <p className="mt-5 text-lg text-ink-foreground/80">
              Verificerede profiler, aktiv moderation og fuld kontrol over dine egne data.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SAFETY.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="h-full">
                <div className="h-full border border-ink-foreground/15 bg-ink-foreground/5 p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground">
                    <item.Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-foreground/75">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <Button asChild className="mt-12 h-14 bg-primary px-8 font-semibold hover:bg-primary-soft">
              <Link to="/safety">Læs om sikkerhed</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* VERIFICATION */}
      <section className="container-wide py-20 md:py-28" aria-labelledby="verify-heading">
        <div className="card-sharp grid gap-10 p-8 md:grid-cols-2 md:p-14">
          <Reveal>
            <p className="eyebrow">Verificér din profil</p>
            <h2 id="verify-heading" className="display-md mt-3">
              Et blåt badge giver dobbelt så mange svar
            </h2>
            <p className="mt-5 text-muted-foreground">
              Vælg den metode du er tryg ved. Vi gemmer aldrig din selfie-verificering længere end
              nødvendigt.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-3">
            {[
              { Icon: Mail, label: "E-mail", meta: "Verificeret" },
              { Icon: Smartphone, label: "Telefon", meta: "Anbefalet" },
              { Icon: ScanFace, label: "Selfie-verificering", meta: "Giver badge" },
            ].map(({ Icon, label, meta }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 border border-border bg-secondary px-5 py-4"
              >
                <span className="flex items-center gap-3 font-semibold">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  {label}
                </span>
                <span className="text-sm text-muted-foreground">{meta}</span>
              </div>
            ))}
            <Button asChild className="h-14 w-full bg-primary py-4 font-semibold hover:bg-primary-soft">
              <Link to="/onboarding">Start verificering</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-primary py-20 text-primary-foreground md:py-28">
        <div className="container-wide text-center">
          <Reveal>
            <h2 className="display-lg mx-auto max-w-3xl">Din næste gode samtale starter her.</h2>
            <Button asChild className="mt-10 h-14 bg-ink px-10 text-base font-semibold text-ink-foreground hover:bg-ink/90">
              <Link to="/onboarding">Opret gratis profil</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <MatchModal profile={match} onClose={() => setMatch(null)} />
    </SiteLayout>
  );
};

export default Home;
