import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export type Profile = {
  id: string;
  name: string;
  age: number;
  city: string;
  distanceKm: number;
  verified: boolean;
  online: boolean;
  pronouns: string;
  orientation: string;
  looking: string;
  bio: string;
  interests: string[];
  photos: string[];
  lifestyle: { label: string; value: string }[];
  height: number;
  education: string;
};

export const INTERESTS = [
  "Musik",
  "Fitness",
  "Rejser",
  "Mad",
  "Kunst",
  "Film",
  "Gaming",
  "Natur",
  "Sport",
  "Design",
  "Kaffe",
  "Koncerter",
];

export const RELATION_TYPES = [
  "Dating",
  "Seriøst forhold",
  "Nye bekendtskaber",
  "Venskab",
  "Casual dating",
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

export const DISTANCES = ["5 km", "10 km", "25 km", "50 km", "100 km", "Hele landet"];

export const profiles: Profile[] = [
  {
    id: "emma",
    name: "Emma",
    age: 28,
    city: "København",
    distanceKm: 3,
    verified: true,
    online: true,
    pronouns: "hun/hende",
    orientation: "Biseksuel",
    looking: "Seriøst forhold",
    bio: "Design, rejser, kaffe og søndage uden planer.",
    interests: ["Rejser", "Design", "Musik", "Kaffe"],
    photos: [p1],
    lifestyle: [
      { label: "Rygning", value: "Nej" },
      { label: "Alkohol", value: "Socialt" },
      { label: "Træning", value: "3× om ugen" },
      { label: "Børn", value: "Måske en dag" },
      { label: "Dyr", value: "Hundemenneske" },
      { label: "Arbejde", value: "Produktdesigner" },
    ],
    height: 170,
    education: "Kandidat i design",
  },
  {
    id: "marcus",
    name: "Marcus",
    age: 31,
    city: "Aarhus",
    distanceKm: 12,
    verified: true,
    online: false,
    pronouns: "han/ham",
    orientation: "Heteroseksuel",
    looking: "Dating",
    bio: "Museer om dagen, vinylplader om aftenen. Kan lave en fejlfri ragù.",
    interests: ["Kunst", "Mad", "Film"],
    photos: [p2],
    lifestyle: [
      { label: "Rygning", value: "Nej" },
      { label: "Alkohol", value: "Sjældent" },
      { label: "Træning", value: "Løber" },
      { label: "Børn", value: "Ønsker børn" },
      { label: "Dyr", value: "Katte" },
      { label: "Arbejde", value: "Kurator" },
    ],
    height: 184,
    education: "Kunsthistorie",
  },
  {
    id: "sara",
    name: "Sara",
    age: 26,
    city: "Odense",
    distanceKm: 24,
    verified: false,
    online: true,
    pronouns: "hun/hende",
    orientation: "Queer",
    looking: "Nye bekendtskaber",
    bio: "Havbad året rundt. Elsker samtaler der varer længere end planlagt.",
    interests: ["Natur", "Musik", "Film", "Kaffe"],
    photos: [p3],
    lifestyle: [
      { label: "Rygning", value: "Nej" },
      { label: "Alkohol", value: "Socialt" },
      { label: "Træning", value: "Svømning" },
      { label: "Børn", value: "Nej tak" },
      { label: "Dyr", value: "Alle slags" },
      { label: "Arbejde", value: "Fysioterapeut" },
    ],
    height: 165,
    education: "Professionsbachelor",
  },
  {
    id: "daniel",
    name: "Daniel",
    age: 34,
    city: "København",
    distanceKm: 7,
    verified: true,
    online: false,
    pronouns: "han/ham",
    orientation: "Homoseksuel",
    looking: "Seriøst forhold",
    bio: "Arkitekt med svaghed for regnvejr, jazz og lange middage.",
    interests: ["Design", "Musik", "Mad", "Rejser"],
    photos: [p4],
    lifestyle: [
      { label: "Rygning", value: "Nej" },
      { label: "Alkohol", value: "Socialt" },
      { label: "Træning", value: "Cykler" },
      { label: "Børn", value: "Åben" },
      { label: "Dyr", value: "Hund" },
      { label: "Arbejde", value: "Arkitekt" },
    ],
    height: 179,
    education: "Arkitektskolen",
  },
  {
    id: "noa",
    name: "Noa",
    age: 29,
    city: "Aalborg",
    distanceKm: 41,
    verified: true,
    online: true,
    pronouns: "de/dem",
    orientation: "Panseksuel",
    looking: "Dating",
    bio: "Plantefar, playlist-kurator og altid klar på en spontan udstilling.",
    interests: ["Kunst", "Gaming", "Design"],
    photos: [p5],
    lifestyle: [
      { label: "Rygning", value: "Nej" },
      { label: "Alkohol", value: "Sjældent" },
      { label: "Træning", value: "Yoga" },
      { label: "Børn", value: "Nej tak" },
      { label: "Dyr", value: "Katte" },
      { label: "Arbejde", value: "Illustrator" },
    ],
    height: 176,
    education: "Grafisk design",
  },
  {
    id: "ida",
    name: "Ida",
    age: 24,
    city: "Roskilde",
    distanceKm: 33,
    verified: false,
    online: false,
    pronouns: "hun/hende",
    orientation: "Heteroseksuel",
    looking: "Casual dating",
    bio: "Løber i skoven før arbejde. Bedst til morgenmad, værst til smalltalk.",
    interests: ["Fitness", "Natur", "Sport", "Mad"],
    photos: [p6],
    lifestyle: [
      { label: "Rygning", value: "Nej" },
      { label: "Alkohol", value: "Aldrig" },
      { label: "Træning", value: "Dagligt" },
      { label: "Børn", value: "Måske" },
      { label: "Dyr", value: "Hund" },
      { label: "Arbejde", value: "Fysio-studerende" },
    ],
    height: 172,
    education: "Studerende",
  },
];

export const getProfile = (id?: string) => profiles.find((p) => p.id === id);

export type Conversation = {
  id: string;
  profileId: string;
  unread: number;
  lastActive: string;
  messages: { id: string; from: "me" | "them"; text: string; time: string; read?: boolean }[];
};

export const conversations: Conversation[] = [
  {
    id: "c1",
    profileId: "emma",
    unread: 2,
    lastActive: "nu",
    messages: [
      { id: "m1", from: "them", text: "Hej! Din profil fik mig til at smile 🙂", time: "20:12" },
      { id: "m2", from: "me", text: "Hej Emma! Det var da en god start. Hvad laver du i weekenden?", time: "20:14", read: true },
      { id: "m3", from: "them", text: "Loppemarked og alt for meget kaffe. Skal du med?", time: "20:15" },
    ],
  },
  {
    id: "c2",
    profileId: "daniel",
    unread: 0,
    lastActive: "2 t",
    messages: [
      { id: "m1", from: "me", text: "Din ragù-påstand skal testes.", time: "18:02", read: true },
      { id: "m2", from: "them", text: "Udfordring accepteret. Torsdag?", time: "18:20" },
    ],
  },
  {
    id: "c3",
    profileId: "noa",
    unread: 1,
    lastActive: "i går",
    messages: [
      { id: "m1", from: "them", text: "Der åbner en ny udstilling på Louisiana 👀", time: "11:40" },
    ],
  },
];
