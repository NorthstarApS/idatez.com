import { useMemo, useState } from "react";
import { SlidersHorizontal, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/idatez/SiteLayout";
import ProfileGrid from "@/components/idatez/ProfileGrid";
import MatchModal from "@/components/idatez/MatchModal";
import FilterDrawer, { defaultFilters, Filters } from "@/components/idatez/FilterDrawer";
import { toast } from "@/hooks/use-toast";
import { Profile, profiles } from "@/data/profiles";

const distanceToKm = (label: string) =>
  label === "Hele landet" ? Number.POSITIVE_INFINITY : parseInt(label, 10);

const Discover = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [drawer, setDrawer] = useState(false);
  const [skipped, setSkipped] = useState<string[]>([]);
  const [match, setMatch] = useState<Profile | null>(null);

  const results = useMemo(
    () =>
      profiles.filter((p) => {
        if (skipped.includes(p.id)) return false;
        if (p.age < filters.ageRange[0] || p.age > filters.ageRange[1]) return false;
        if (p.distanceKm > distanceToKm(filters.distance)) return false;
        if (filters.orientation !== "Alle" && p.orientation !== filters.orientation) return false;
        if (filters.relation !== "Alle" && p.looking !== filters.relation) return false;
        if (filters.heightMin > p.height) return false;
        if (filters.onlineNow && !p.online) return false;
        if (filters.verifiedOnly && !p.verified) return false;
        if (
          filters.interests.length > 0 &&
          !filters.interests.some((i) => p.interests.includes(i))
        )
          return false;
        return true;
      }),
    [filters, skipped],
  );

  return (
    <SiteLayout>
      <div className="container-wide py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Discover</p>
            <h1 className="display-md mt-2">Profiler til dig</h1>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Viser personer inden for {filters.distance} · {results.length} profiler
            </p>
          </div>
          <Button
            onClick={() => setDrawer(true)}
            variant="outline"
            className="h-12 border-foreground font-semibold"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" aria-hidden="true" />
            Filtre
          </Button>
        </div>

        <div className="mt-10">
          <ProfileGrid
            profiles={results}
            onLike={(p) => setMatch(p)}
            onSkip={(p) => setSkipped((prev) => [...prev, p.id])}
            onSuperLike={(p) => toast({ title: `Super like sendt til ${p.name} ⭐` })}
          />
        </div>

        {skipped.length > 0 && (
          <div className="mt-10 text-center">
            <Button variant="ghost" className="h-12 font-semibold" onClick={() => setSkipped([])}>
              Vis skippede profiler igen
            </Button>
          </div>
        )}
      </div>

      <FilterDrawer open={drawer} onOpenChange={setDrawer} filters={filters} onChange={setFilters} />
      <MatchModal profile={match} onClose={() => setMatch(null)} />
    </SiteLayout>
  );
};

export default Discover;
