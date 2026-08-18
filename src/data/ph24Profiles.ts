import pp1 from "@/assets/ph24/pp1.jpg";
import pp2 from "@/assets/ph24/pp2.jpg";
import pp3 from "@/assets/ph24/pp3.jpg";
import pp4 from "@/assets/ph24/pp4.jpg";
import pp5 from "@/assets/ph24/pp5.jpg";
import pp6 from "@/assets/ph24/pp6.jpg";
import hero from "@/assets/ph24/hero-portrait.jpg";
import cafe from "@/assets/ph24/story-cafe.jpg";

export type Prompt = { question: string; answer: string };

export type PhProfile = {
  id: string;
  name: string;
  age: number;
  city: string;
  distanceKm: number;
  verified: boolean;
  online: boolean;
  gender: "Kvinde" | "Mand" | "Non-binær";
  orientation: string;
  looking: string;
  headline: string;
  bio: string;
  interests: string[];
  values: string[];
  prompts: Prompt[];
  photos: string[];
  lifestyle: { label: string; value: string }[];
  height: number;
  work: string;
  newOnSite?: boolean;
};

export const LOOKING_FOR = [
  "Seriøst forhold",
  "Dating",
  "Venskab",
  "Nye bekendtskaber",
];

export const ORIENTATIONS = [
  "Heteroseksuel",
  "Homoseksuel",
  "Biseksuel",
  "Panseksuel",
  "Queer",
  "Andet",
  "Foretrækker ikke at oplyse",
];

export const INTERESTS = [
  "Rejser",
  "Mad",
  "Natur",
  "Kunst",
  "Musik",
  "Film",
  "Løb",
  "Vin",
  "Kaffe",
  "Bøger",
  "Hund",
  "Familie",
];

export const LIFESTYLE_FILTERS = [
  "Ryger ikke",
  "Har børn",
  "Ønsker børn",
  "Aktiv livsstil",
  "Har hund",
];

export const PROMPT_LIBRARY = [
  "En perfekt weekend for mig...",
  "Jeg falder for mennesker der...",
  "Noget jeg aldrig bliver træt af...",
  "Mit bedste rejseminde...",
  "Vi passer godt sammen hvis...",
];

export const ph24Profiles: PhProfile[] = [
  {
    id: "sofie",
    name: "Sofie",
    age: 31,
    city: "København",
    distanceKm: 4,
    verified: true,
    online: true,
    gender: "Kvinde",
    orientation: "Heteroseksuel",
    looking: "Seriøst forhold",
    headline: "Søger et seriøst forhold",
    bio: "Jeg leder efter én at dele både rejser og helt almindelige tirsdage med.",
    interests: ["Rejser", "Mad", "Natur", "Kaffe"],
    values: ["Familie", "Humor", "Rejser", "Natur", "Karriere"],
    prompts: [
      {
        question: "En perfekt weekend for mig...",
        answer:
          "Lang morgenmad, en tur ud i det og måske en film om aftenen. Ingen planer efter kl. 14.",
      },
      {
        question: "Jeg falder for mennesker der...",
        answer: "kan grine af sig selv og stiller det ene spørgsmål mere end de skal.",
      },
    ],
    photos: [hero, cafe, pp5],
    lifestyle: [
      { label: "Arbejde", value: "Projektleder" },
      { label: "Børn", value: "Ønsker børn" },
      { label: "Rygning", value: "Nej" },
      { label: "Dyr", value: "Hundemenneske" },
    ],
    height: 170,
    work: "Projektleder",
    newOnSite: true,
  },
  {
    id: "mathias",
    name: "Mathias",
    age: 38,
    city: "Aarhus",
    distanceKm: 11,
    verified: true,
    online: false,
    gender: "Mand",
    orientation: "Heteroseksuel",
    looking: "Seriøst forhold",
    headline: "Søger et seriøst forhold",
    bio: "Efterårsture, gode middage og samtaler der varer længere end planlagt.",
    interests: ["Natur", "Mad", "Bøger", "Løb"],
    values: ["Ærlighed", "Familie", "Natur", "Ro"],
    prompts: [
      {
        question: "Noget jeg aldrig bliver træt af...",
        answer: "Efterårsluft, en ny kogebog og at høre om noget, jeg ikke vidste.",
      },
      {
        question: "Vi passer godt sammen hvis...",
        answer: "du gerne vil bygge noget roligt og rigtigt – ikke noget hurtigt.",
      },
    ],
    photos: [pp2, cafe],
    lifestyle: [
      { label: "Arbejde", value: "Ingeniør" },
      { label: "Børn", value: "Har to" },
      { label: "Rygning", value: "Nej" },
      { label: "Træning", value: "Løber" },
    ],
    height: 186,
    work: "Ingeniør",
  },
  {
    id: "camilla",
    name: "Camilla",
    age: 42,
    city: "København",
    distanceKm: 7,
    verified: true,
    online: true,
    gender: "Kvinde",
    orientation: "Biseksuel",
    looking: "Dating",
    headline: "Åben for dating",
    bio: "Museer, vinbarer og planer der bliver lavet om undervejs.",
    interests: ["Kunst", "Vin", "Film", "Bøger"],
    values: ["Nysgerrighed", "Kultur", "Frihed", "Humor"],
    prompts: [
      {
        question: "Mit bedste rejseminde...",
        answer: "En regnvejrsdag i Lissabon, hvor vi endte i det samme galleri to gange.",
      },
      {
        question: "En perfekt weekend for mig...",
        answer: "Udstilling om formiddagen, naturvin om aftenen, ingen alarm på søndag.",
      },
    ],
    photos: [pp3],
    lifestyle: [
      { label: "Arbejde", value: "Kurator" },
      { label: "Børn", value: "Har én" },
      { label: "Rygning", value: "Nej" },
      { label: "Dyr", value: "Katte" },
    ],
    height: 168,
    work: "Kurator",
    newOnSite: true,
  },
  {
    id: "henrik",
    name: "Henrik",
    age: 45,
    city: "Odense",
    distanceKm: 22,
    verified: false,
    online: false,
    gender: "Mand",
    orientation: "Heteroseksuel",
    looking: "Nye bekendtskaber",
    headline: "Leder efter nye bekendtskaber",
    bio: "Laver altid for meget mad. Du er velkommen til at spise med.",
    interests: ["Mad", "Musik", "Natur", "Familie"],
    values: ["Familie", "Gæstfrihed", "Ro", "Humor"],
    prompts: [
      {
        question: "Noget jeg aldrig bliver træt af...",
        answer: "Søndagsstegen og en plade, der spiller hele vejen igennem.",
      },
    ],
    photos: [pp4],
    lifestyle: [
      { label: "Arbejde", value: "Kok" },
      { label: "Børn", value: "Voksne børn" },
      { label: "Rygning", value: "Nej" },
      { label: "Dyr", value: "Hund" },
    ],
    height: 180,
    work: "Kok",
  },
  {
    id: "line",
    name: "Line",
    age: 27,
    city: "Aalborg",
    distanceKm: 38,
    verified: true,
    online: true,
    gender: "Kvinde",
    orientation: "Heteroseksuel",
    looking: "Dating",
    headline: "Åben for dating",
    bio: "Vinterbader hele året. Bedst til lange gåture og dårlige jokes.",
    interests: ["Natur", "Løb", "Kaffe", "Musik"],
    values: ["Sundhed", "Ærlighed", "Eventyr", "Nærvær"],
    prompts: [
      {
        question: "Jeg falder for mennesker der...",
        answer: "siger ja til en tur i vandet, også når det regner.",
      },
      {
        question: "Vi passer godt sammen hvis...",
        answer: "du kan holde en samtale i gang på en fire timers gåtur.",
      },
    ],
    photos: [pp5, pp1],
    lifestyle: [
      { label: "Arbejde", value: "Fysioterapeut" },
      { label: "Børn", value: "Måske en dag" },
      { label: "Rygning", value: "Nej" },
      { label: "Træning", value: "Dagligt" },
    ],
    height: 172,
    work: "Fysioterapeut",
    newOnSite: true,
  },
  {
    id: "jonas",
    name: "Jonas",
    age: 33,
    city: "København",
    distanceKm: 9,
    verified: true,
    online: true,
    gender: "Mand",
    orientation: "Homoseksuel",
    looking: "Seriøst forhold",
    headline: "Søger et seriøst forhold",
    bio: "Mig, min hund og en playliste der aldrig bliver færdig.",
    interests: ["Hund", "Musik", "Kaffe", "Film"],
    values: ["Loyalitet", "Humor", "Nærvær", "Musik"],
    prompts: [
      {
        question: "En perfekt weekend for mig...",
        answer: "Morgenkaffe med hunden, byen om eftermiddagen, mad hjemme om aftenen.",
      },
    ],
    photos: [pp6],
    lifestyle: [
      { label: "Arbejde", value: "Lærer" },
      { label: "Børn", value: "Åben" },
      { label: "Rygning", value: "Nej" },
      { label: "Dyr", value: "Hund" },
    ],
    height: 178,
    work: "Lærer",
  },
  {
    id: "maja",
    name: "Maja",
    age: 35,
    city: "Roskilde",
    distanceKm: 31,
    verified: false,
    online: false,
    gender: "Kvinde",
    orientation: "Queer",
    looking: "Venskab",
    headline: "Leder efter venskaber først",
    bio: "Bøger, brætspil og en meget stor plantesamling.",
    interests: ["Bøger", "Kunst", "Kaffe", "Familie"],
    values: ["Ro", "Ærlighed", "Kreativitet"],
    prompts: [
      {
        question: "Noget jeg aldrig bliver træt af...",
        answer: "Biblioteket en tirsdag formiddag, hvor der næsten ingen er.",
      },
    ],
    photos: [pp1],
    lifestyle: [
      { label: "Arbejde", value: "Bibliotekar" },
      { label: "Børn", value: "Nej tak" },
      { label: "Rygning", value: "Nej" },
      { label: "Dyr", value: "Kat" },
    ],
    height: 165,
    work: "Bibliotekar",
  },
  {
    id: "anders",
    name: "Anders",
    age: 51,
    city: "Aarhus",
    distanceKm: 14,
    verified: true,
    online: false,
    gender: "Mand",
    orientation: "Heteroseksuel",
    looking: "Seriøst forhold",
    headline: "Søger et seriøst forhold",
    bio: "Har fundet ud af, hvad jeg ikke leder efter. Nu prøver jeg det modsatte.",
    interests: ["Vin", "Rejser", "Natur", "Film"],
    values: ["Modenhed", "Humor", "Nærvær", "Rejser"],
    prompts: [
      {
        question: "Vi passer godt sammen hvis...",
        answer: "du synes, en tirsdag godt kan være en anledning.",
      },
    ],
    photos: [pp2, pp4],
    lifestyle: [
      { label: "Arbejde", value: "Selvstændig" },
      { label: "Børn", value: "Voksne børn" },
      { label: "Rygning", value: "Nej" },
      { label: "Dyr", value: "Ingen" },
    ],
    height: 183,
    work: "Selvstændig",
  },
];

export const getPhProfile = (id?: string) => ph24Profiles.find((p) => p.id === id);

/** Concrete shared things instead of a fake "98 % match score". */
export const commonGround = (p: PhProfile) => {
  const mine = ["Rejser", "Kaffe", "Natur", "Hund", "Musik", "Mad"];
  const shared = p.interests.filter((i) => mine.includes(i)).map((i) => `Begge kan lide ${i.toLowerCase()}`);
  const base: string[] = [];
  if (p.looking === "Seriøst forhold") base.push("Begge leder efter et forhold");
  if (p.lifestyle.some((l) => l.value.toLowerCase().includes("hund"))) base.push("Begge har hund");
  return [...base, ...shared].slice(0, 6);
};

export type PhConversation = {
  id: string;
  profileId: string;
  unread: number;
  lastActive: string;
  messages: { id: string; from: "me" | "them"; text: string; time: string; read?: boolean }[];
};

export const ph24Conversations: PhConversation[] = [
  {
    id: "c1",
    profileId: "sofie",
    unread: 2,
    lastActive: "nu",
    messages: [
      { id: "m1", from: "them", text: "Hej! Din profil fik mig til at smile.", time: "20:12" },
      {
        id: "m2",
        from: "me",
        text: "Hej Sofie – det var da en god start. Hvad laver du i weekenden?",
        time: "20:14",
        read: true,
      },
      { id: "m3", from: "them", text: "Loppemarked og alt for meget kaffe. Skal du med?", time: "20:15" },
    ],
  },
  {
    id: "c2",
    profileId: "mathias",
    unread: 0,
    lastActive: "2 t",
    messages: [
      { id: "m1", from: "me", text: "Din kogebogssamling skal vist testes.", time: "18:02", read: true },
      { id: "m2", from: "them", text: "Udfordring accepteret. Torsdag?", time: "18:20" },
    ],
  },
  {
    id: "c3",
    profileId: "camilla",
    unread: 1,
    lastActive: "i går",
    messages: [
      { id: "m1", from: "them", text: "Der åbner en ny udstilling på Louisiana.", time: "11:40" },
    ],
  },
];

export const heroPortrait = hero;
export const storyCafe = cafe;
