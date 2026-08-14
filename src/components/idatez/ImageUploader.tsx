import { useRef, useState } from "react";
import { Upload, Star, Trash2, ArrowLeft, ArrowRight, Crop } from "lucide-react";

type Photo = { id: string; url: string; name: string };

const ImageUploader = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ id: `${f.name}-${Date.now()}-${Math.random()}`, url: URL.createObjectURL(f), name: f.name }));
    setPhotos((prev) => [...prev, ...next].slice(0, 6));
  };

  const move = (index: number, dir: -1 | 1) => {
    setPhotos((prev) => {
      const target = index + dir;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  };

  const makePrimary = (index: number) =>
    setPhotos((prev) => [prev[index], ...prev.filter((_, i) => i !== index)]);

  return (
    <div className="space-y-5">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed p-10 text-center transition-colors ${
          dragging ? "border-primary bg-accent" : "border-border bg-secondary"
        }`}
      >
        <Upload className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
        <p className="mt-4 font-display text-lg font-bold">Træk dine billeder herind</p>
        <p className="mt-1 text-sm text-muted-foreground">Op til 6 billeder. JPG eller PNG.</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="tap-target mt-5 inline-flex items-center bg-ink px-6 py-3 text-sm font-semibold text-ink-foreground"
        >
          Vælg billeder
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          aria-label="Upload profilbilleder"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {photos.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {photos.map((photo, index) => (
            <li key={photo.id} className="card-sharp overflow-hidden">
              <div className="relative">
                <img
                  src={photo.url}
                  alt={photo.name}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
                {index === 0 && (
                  <span className="absolute left-2 top-2 bg-primary px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
                    Profilbillede
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-1 p-2">
                <button
                  type="button"
                  aria-label="Flyt til venstre"
                  onClick={() => move(index, -1)}
                  className="tap-target flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Sæt som profilbillede"
                  onClick={() => makePrimary(index)}
                  className="tap-target flex items-center justify-center text-muted-foreground hover:text-primary"
                >
                  <Star className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Beskær billede"
                  className="tap-target flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <Crop className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Slet billede"
                  onClick={() => setPhotos((prev) => prev.filter((p) => p.id !== photo.id))}
                  className="tap-target flex items-center justify-center text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Flyt til højre"
                  onClick={() => move(index, 1)}
                  className="tap-target flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImageUploader;
