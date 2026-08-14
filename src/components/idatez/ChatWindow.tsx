import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Ban, Check, CheckCheck, Flag, Image as ImageIcon, Send, Smile } from "lucide-react";
import { Conversation, getProfile } from "@/data/profiles";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import VerificationBadge from "./VerificationBadge";

type Msg = Conversation["messages"][number];

const EMOJIS = ["😊", "😍", "🔥", "☕", "🙌", "😂", "❤️"];

const ChatWindow = ({
  conversation,
  onBack,
}: {
  conversation: Conversation;
  onBack?: () => void;
}) => {
  const profile = getProfile(conversation.profileId);
  const [messages, setMessages] = useState<Msg[]>(conversation.messages);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(conversation.messages);
    setDraft("");
  }, [conversation]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, typing]);

  if (!profile) return null;

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        from: "me",
        text,
        time: new Date().toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" }),
        read: false,
      },
    ]);
    setDraft("");
    setShowEmoji(false);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          from: "them",
          text: "Det lyder godt! 😊",
          time: new Date().toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1800);
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-surface">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            className="tap-target lg:hidden"
            aria-label="Tilbage til samtaler"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <Link to={`/profile/${profile.id}`} className="flex min-w-0 items-center gap-3">
          <img src={profile.photos[0]} alt="" loading="lazy" className="h-11 w-11 object-cover" />
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <span className="truncate font-display text-base font-bold">{profile.name}</span>
              {profile.verified && <VerificationBadge label="OK" className="px-1.5 py-0.5" />}
            </span>
            <span className="block text-xs text-muted-foreground">
              {profile.online ? "Aktiv nu" : `Aktiv ${conversation.lastActive}`}
            </span>
          </span>
        </Link>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="tap-target" aria-label="Flere handlinger">
                <span aria-hidden="true" className="text-lg leading-none">
                  ···
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast({ title: `${profile.name} er blokeret` })}>
                <Ban className="mr-2 h-4 w-4" /> Blokér
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "Tak – vi kigger på det" })}>
                <Flag className="mr-2 h-4 w-4" /> Rapportér
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-6" aria-live="polite">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed ${
                m.from === "me"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-secondary text-foreground"
              }`}
            >
              <p>{m.text}</p>
              <span
                className={`mt-1 flex items-center justify-end gap-1 text-[11px] ${
                  m.from === "me" ? "text-primary-foreground/75" : "text-muted-foreground"
                }`}
              >
                {m.time}
                {m.from === "me" &&
                  (m.read ? (
                    <CheckCheck className="h-3.5 w-3.5" aria-label="Læst" />
                  ) : (
                    <Check className="h-3.5 w-3.5" aria-label="Sendt" />
                  ))}
              </span>
            </div>
          </div>
        ))}
        {typing && (
          <p className="text-xs italic text-muted-foreground">{profile.name} skriver …</p>
        )}
        <div ref={endRef} />
      </div>

      {showEmoji && (
        <div className="flex gap-2 border-t border-border px-4 py-3">
          {EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              aria-label={`Indsæt ${e}`}
              onClick={() => setDraft((d) => d + e)}
              className="tap-target text-xl"
            >
              {e}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="tap-target"
          aria-label="Emoji"
          onClick={() => setShowEmoji((v) => !v)}
        >
          <Smile className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="tap-target"
          aria-label="Send billede"
          onClick={() => toast({ title: "Billeddeling kommer snart" })}
        >
          <ImageIcon className="h-5 w-5" />
        </Button>
        <label htmlFor="chat-input" className="sr-only">
          Skriv en besked
        </label>
        <input
          id="chat-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Skriv en besked …"
          className="h-11 flex-1 border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button
          type="submit"
          size="icon"
          className="tap-target bg-primary hover:bg-primary-soft"
          aria-label="Send besked"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatWindow;
