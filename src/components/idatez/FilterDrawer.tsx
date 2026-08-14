import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { DISTANCES, INTERESTS, ORIENTATIONS, RELATION_TYPES } from "@/data/profiles";
import InterestChips from "./InterestChips";

export type Filters = {
  gender: string;
  ageRange: [number, number];
  distance: string;
  orientation: string;
  relation: string;
  interests: string[];
  heightMin: number;
  education: string;
  smoking: string;
  children: string;
  training: string;
  onlineNow: boolean;
  verifiedOnly: boolean;
};

export const defaultFilters: Filters = {
  gender: "Alle",
  ageRange: [18, 40],
  distance: "50 km",
  orientation: "Alle",
  relation: "Alle",
  interests: [],
  heightMin: 150,
  education: "Alle",
  smoking: "Alle",
  children: "Alle",
  training: "Alle",
  onlineNow: false,
  verifiedOnly: false,
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: Filters;
  onChange: (filters: Filters) => void;
};

const SIMPLE_SELECTS: { key: keyof Filters; label: string; options: string[] }[] = [
  { key: "gender", label: "Køn", options: ["Alle", "Kvinder", "Mænd", "Non-binære"] },
  { key: "orientation", label: "Seksuel orientering", options: ["Alle", ...ORIENTATIONS] },
  { key: "relation", label: "Relationstype", options: ["Alle", ...RELATION_TYPES] },
  { key: "education", label: "Uddannelse", options: ["Alle", "Studerende", "Bachelor", "Kandidat"] },
  { key: "smoking", label: "Rygning", options: ["Alle", "Nej", "Socialt", "Ja"] },
  { key: "children", label: "Børn", options: ["Alle", "Ønsker børn", "Måske", "Nej tak"] },
  { key: "training", label: "Træning", options: ["Alle", "Dagligt", "Ugentligt", "Sjældent"] },
];

const FilterDrawer = ({ open, onOpenChange, filters, onChange }: Props) => {
  const isMobile = useIsMobile();
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`overflow-y-auto bg-surface ${isMobile ? "h-[90vh]" : "w-full sm:max-w-md"}`}
      >
        <SheetHeader className="text-left">
          <SheetTitle className="font-display text-2xl">Filtre</SheetTitle>
          <SheetDescription>Find præcis de mennesker, du gerne vil møde.</SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8 pb-8">
          <div>
            <Label className="text-sm font-semibold">
              Alder: {filters.ageRange[0]}–{filters.ageRange[1]} år
            </Label>
            <Slider
              className="mt-4"
              min={18}
              max={70}
              step={1}
              value={filters.ageRange}
              onValueChange={(v) => set("ageRange", [v[0], v[1] ?? v[0]])}
              aria-label="Aldersinterval"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold">Vis personer inden for</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {DISTANCES.map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={filters.distance === d}
                  onClick={() => set("distance", d)}
                  className={`tap-target border px-4 text-sm font-medium transition-colors ${
                    filters.distance === d
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface hover:border-foreground"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {SIMPLE_SELECTS.map((field) => (
              <div key={field.key}>
                <Label htmlFor={`filter-${field.key}`} className="text-sm font-semibold">
                  {field.label}
                </Label>
                <Select
                  value={filters[field.key] as string}
                  onValueChange={(v) => set(field.key, v as never)}
                >
                  <SelectTrigger id={`filter-${field.key}`} className="mt-2 h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          <div>
            <Label className="text-sm font-semibold">Højde fra: {filters.heightMin} cm</Label>
            <Slider
              className="mt-4"
              min={150}
              max={200}
              step={1}
              value={[filters.heightMin]}
              onValueChange={(v) => set("heightMin", v[0])}
              aria-label="Minimumshøjde"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold">Interesser</Label>
            <div className="mt-3">
              <InterestChips
                items={INTERESTS}
                size="sm"
                selected={filters.interests}
                ariaLabel="Filtrér på interesser"
                onToggle={(v) =>
                  set(
                    "interests",
                    filters.interests.includes(v)
                      ? filters.interests.filter((i) => i !== v)
                      : [...filters.interests, v],
                  )
                }
              />
            </div>
          </div>

          <div className="space-y-4 border-t border-border pt-6">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="filter-online" className="text-sm font-semibold">
                Online nu
              </Label>
              <Switch
                id="filter-online"
                checked={filters.onlineNow}
                onCheckedChange={(v) => set("onlineNow", v)}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="filter-verified" className="text-sm font-semibold">
                Kun verificerede profiler
              </Label>
              <Switch
                id="filter-verified"
                checked={filters.verifiedOnly}
                onCheckedChange={(v) => set("verifiedOnly", v)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="h-12 flex-1" onClick={() => onChange(defaultFilters)}>
              Nulstil
            </Button>
            <Button
              className="h-12 flex-1 bg-primary font-semibold hover:bg-primary-soft"
              onClick={() => onOpenChange(false)}
            >
              Vis profiler
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawer;
