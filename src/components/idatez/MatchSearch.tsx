import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ORIENTATIONS, RELATION_TYPES } from "@/data/profiles";

const MatchSearch = ({ className = "" }: { className?: string }) => {
  const navigate = useNavigate();
  const [iAm, setIAm] = useState("Kvinde");
  const [seeking, setSeeking] = useState("Alle");
  const [ages, setAges] = useState<[number, number]>([18, 35]);
  const [relation, setRelation] = useState("Dating");
  const [orientation, setOrientation] = useState("Foretrækker ikke at oplyse");
  const [expanded, setExpanded] = useState(false);

  return (
    <form
      className={`card-sharp bg-surface/95 p-5 backdrop-blur md:p-7 ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        navigate("/discover");
      }}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="ms-iam" className="text-xs font-semibold uppercase tracking-widest">
            Jeg er
          </Label>
          <Select value={iAm} onValueChange={setIAm}>
            <SelectTrigger id="ms-iam" className="mt-2 h-12 text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Mand", "Kvinde", "Non-binær", "Andet"].map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="ms-seeking" className="text-xs font-semibold uppercase tracking-widest">
            Jeg søger
          </Label>
          <Select value={seeking} onValueChange={setSeeking}>
            <SelectTrigger id="ms-seeking" className="mt-2 h-12 text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Kvinder", "Mænd", "Alle"].map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs font-semibold uppercase tracking-widest">
            Alder {ages[0]}–{ages[1]}
          </Label>
          <div className="mt-6 px-1">
            <Slider
              min={18}
              max={70}
              step={1}
              value={ages}
              onValueChange={(v) => setAges([v[0], v[1] ?? v[0]])}
              aria-label="Aldersinterval"
            />
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-6 grid animate-fade-in gap-6 border-t border-border pt-6 md:grid-cols-2">
          <div>
            <Label className="text-xs font-semibold uppercase tracking-widest">Interesseret i</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {RELATION_TYPES.map((r) => (
                <button
                  key={r}
                  type="button"
                  aria-pressed={relation === r}
                  onClick={() => setRelation(r)}
                  className={`tap-target border px-4 text-sm font-medium transition-colors ${
                    relation === r
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface hover:border-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="ms-orientation" className="text-xs font-semibold uppercase tracking-widest">
              Seksuel orientering
            </Label>
            <Select value={orientation} onValueChange={setOrientation}>
              <SelectTrigger id="ms-orientation" className="mt-3 h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ORIENTATIONS.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          className="h-14 flex-1 bg-primary py-4 text-base font-semibold hover:bg-primary-soft"
        >
          <Search className="mr-2 h-5 w-5" aria-hidden="true" />
          Vis profiler
        </Button>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="tap-target inline-flex items-center justify-center gap-1.5 px-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          Flere muligheder
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>
    </form>
  );
};

export default MatchSearch;
