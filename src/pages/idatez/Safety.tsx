import { Link } from "react-router-dom";
import { ShieldCheck, Lock, UserCheck, BadgeCheck, Flag, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/idatez/SiteLayout";
import SafetyCard from "@/components/idatez/SafetyCard";
import Reveal from "@/components/idatez/Reveal";

const CARDS = [
  { Icon: BadgeCheck, title: "Profilverificering", description: "E-mail, telefon eller selfie. Verificerede profiler får et synligt badge." },
  { Icon: Flag, title: "Rapportering", description: "Anmeld en profil eller besked i to tryk. Vi svarer inden 24 timer." },
  { Icon: UserCheck, title: "Blokering", description: "Blokerede brugere kan ikke se din profil eller kontakte dig igen." },
  { Icon: ShieldCheck, title: "Moderation", description: "Automatiske filtre og et menneskeligt team arbejder døgnet rundt." },
  { Icon: Lock, title: "Privatlivskontrol", description: "Vælg selv om orientering, uddannelse og livsstil vises på din profil." },
  { Icon: EyeOff, title: "Skjult lokation", description: "Vi viser kun cirka-afstand – aldrig din adresse eller live-position." },
];

const Safety = () => (
  <SiteLayout>
    <div className="container-wide py-14 md:py-20">
      <Reveal className="max-w-3xl">
        <p className="eyebrow">Trust &amp; Safety</p>
        <h1 className="display-xl mt-4">Dating skal føles trygt.</h1>
        <p className="mt-6 text-lg text-muted-foreground md:text-xl">
          Vi bygger iDatez, så du kan koncentrere dig om samtalen – ikke om, hvem du taler med.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.06} className="h-full">
            <SafetyCard {...card} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <div className="bg-ink p-10 text-ink-foreground md:p-14">
          <h2 className="display-md max-w-2xl">Oplever du noget, der ikke føles rigtigt?</h2>
          <p className="mt-4 max-w-xl text-ink-foreground/80">
            Skriv til vores sikkerhedsteam. Alle henvendelser behandles fortroligt.
          </p>
          <Button asChild className="mt-8 h-14 bg-primary px-8 font-semibold hover:bg-primary-soft">
            <Link to="/messages">Kontakt sikkerhedsteamet</Link>
          </Button>
        </div>
      </Reveal>
    </div>
  </SiteLayout>
);

export default Safety;
