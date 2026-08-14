import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Logo from "@/components/idatez/Logo";
import OnboardingStep from "@/components/idatez/OnboardingStep";
import ImageUploader from "@/components/idatez/ImageUploader";
import InterestChips from "@/components/idatez/InterestChips";
import { INTERESTS, RELATION_TYPES } from "@/data/profiles";

const TOTAL = 8;

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [meet, setMeet] = useState("");
  const [looking, setLooking] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [bio, setBio] = useState("");

  const next = () => (step === TOTAL ? navigate("/discover") : setStep((s) => s + 1));
  const back = () => (step === 1 ? navigate("/") : setStep((s) => s - 1));

  const Choice = ({
    options,
    value,
    onSelect,
    label,
  }: {
    options: string[];
    value: string;
    onSelect: (v: string) => void;
    label: string;
  }) => (
    <div className="grid max-w-xl gap-3" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onSelect(o)}
          className={`flex min-h-14 items-center border px-6 text-left text-lg font-semibold transition-colors ${
            value === o
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-surface hover:border-foreground"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border">
        <div className="container-wide flex h-16 items-center justify-between md:h-20">
          <Logo />
          <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
            Gem og luk
          </Link>
        </div>
        <div className="h-1 w-full bg-secondary" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={TOTAL} aria-label="Fremskridt">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(step / TOTAL) * 100}%` }}
          />
        </div>
      </header>

      <main className="container-wide flex-1 py-14 md:py-20">
        {step === 1 && (
          <OnboardingStep step={1} total={TOTAL} title="Hvad hedder du?" description="Sådan vises du på iDatez.">
            <div className="max-w-md">
              <Label htmlFor="ob-name" className="text-sm font-semibold">Fornavn</Label>
              <Input id="ob-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 h-14 text-lg" placeholder="Emma" />
            </div>
          </OnboardingStep>
        )}
        {step === 2 && (
          <OnboardingStep step={2} total={TOTAL} title="Hvornår er du født?" description="Vi viser kun din alder – aldrig din fødselsdato.">
            <div className="max-w-md">
              <Label htmlFor="ob-birth" className="text-sm font-semibold">Fødselsdato</Label>
              <Input id="ob-birth" type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="mt-2 h-14 text-lg" />
            </div>
          </OnboardingStep>
        )}
        {step === 3 && (
          <OnboardingStep step={3} total={TOTAL} title="Hvad er dit køn?">
            <Choice label="Køn" options={["Mand", "Kvinde", "Non-binær", "Andet"]} value={gender} onSelect={setGender} />
          </OnboardingStep>
        )}
        {step === 4 && (
          <OnboardingStep step={4} total={TOTAL} title="Hvem vil du møde?">
            <Choice label="Hvem vil du møde" options={["Kvinder", "Mænd", "Alle"]} value={meet} onSelect={setMeet} />
          </OnboardingStep>
        )}
        {step === 5 && (
          <OnboardingStep step={5} total={TOTAL} title="Hvad leder du efter?">
            <Choice label="Hvad leder du efter" options={RELATION_TYPES} value={looking} onSelect={setLooking} />
          </OnboardingStep>
        )}
        {step === 6 && (
          <OnboardingStep step={6} total={TOTAL} title="Upload dine billeder" description="Første billede bliver dit profilbillede.">
            <div className="max-w-3xl">
              <ImageUploader />
            </div>
          </OnboardingStep>
        )}
        {step === 7 && (
          <OnboardingStep step={7} total={TOTAL} title="Hvad interesserer dig?" description="Vælg mindst tre.">
            <div className="max-w-2xl">
              <InterestChips
                items={INTERESTS}
                selected={interests}
                ariaLabel="Vælg interesser"
                onToggle={(v) =>
                  setInterests((prev) => (prev.includes(v) ? prev.filter((i) => i !== v) : [...prev, v]))
                }
              />
            </div>
          </OnboardingStep>
        )}
        {step === 8 && (
          <OnboardingStep step={8} total={TOTAL} title="Skriv en kort bio" description="To linjer er nok. Vær konkret.">
            <div className="max-w-xl">
              <Label htmlFor="ob-bio" className="text-sm font-semibold">Om dig</Label>
              <Textarea
                id="ob-bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                maxLength={180}
                className="mt-2 text-lg"
                placeholder="Design, rejser, kaffe og søndage uden planer."
              />
              <p className="mt-2 text-sm text-muted-foreground">{bio.length}/180</p>
            </div>
          </OnboardingStep>
        )}
      </main>

      <div className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur">
        <div className="container-wide flex items-center justify-between gap-4 py-4">
          <Button variant="ghost" className="h-12 font-semibold" onClick={back}>
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Tilbage
          </Button>
          <Button className="h-14 flex-1 bg-primary text-base font-semibold hover:bg-primary-soft sm:flex-none sm:px-10" onClick={next}>
            {step === TOTAL ? "Se profiler" : "Fortsæt"}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
