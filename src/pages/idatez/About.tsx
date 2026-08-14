import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/idatez/SiteLayout";
import Reveal from "@/components/idatez/Reveal";
import story1 from "@/assets/story1.jpg";

const VALUES = [
  { title: "Intentioner frem for algoritmer", text: "Vi matcher på det du leder efter – ikke på hvor meget tid du bruger i appen." },
  { title: "Ægte mennesker", text: "Verificering, moderation og nul tolerance over for fake profiler." },
  { title: "Respekt som standard", text: "Inkluderende valgmuligheder for køn, pronomener og orientering." },
];

const About = () => (
  <SiteLayout>
    <div className="container-wide py-14 md:py-20">
      <Reveal className="max-w-3xl">
        <p className="eyebrow">Om iDatez</p>
        <h1 className="display-xl mt-4">Vi bygger dating, vi selv ville bruge.</h1>
        <p className="mt-6 text-lg text-muted-foreground md:text-xl">
          iDatez startede i København med en simpel idé: færre profiler, bedre samtaler og et design
          der respekterer din tid.
        </p>
      </Reveal>

      <Reveal className="mt-14">
        <img
          src={story1}
          alt="To mennesker går sammen over en bro i byen"
          loading="lazy"
          width={1200}
          height={1200}
          className="aspect-[16/9] w-full object-cover"
        />
      </Reveal>

      <ul className="mt-16 grid gap-10 md:grid-cols-3">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.08}>
            <li className="border-t-2 border-foreground pt-6">
              <h2 className="font-display text-xl font-bold">{v.title}</h2>
              <p className="mt-3 text-muted-foreground">{v.text}</p>
            </li>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-16">
        <Button asChild className="h-14 bg-primary px-8 font-semibold hover:bg-primary-soft">
          <Link to="/onboarding">Opret gratis profil</Link>
        </Button>
      </Reveal>
    </div>
  </SiteLayout>
);

export default About;
