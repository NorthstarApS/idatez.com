import { useState } from "react";
import SiteLayout from "@/components/idatez/SiteLayout";
import ChatList from "@/components/idatez/ChatList";
import ChatWindow from "@/components/idatez/ChatWindow";
import { conversations } from "@/data/profiles";

const Messages = () => {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  return (
    <SiteLayout hideFooter>
      <div className="container-wide py-6 md:py-10">
        <h1 className="sr-only">Beskeder</h1>
        <div className="card-sharp grid h-[calc(100vh-11rem)] min-h-[520px] grid-cols-1 overflow-hidden lg:grid-cols-[360px_1fr]">
          <div
            className={`min-h-0 overflow-y-auto border-border bg-surface lg:block lg:border-r ${
              mobileOpen ? "hidden" : "block"
            }`}
          >
            <div className="border-b border-border px-4 py-4">
              <h2 className="font-display text-xl font-bold">Samtaler</h2>
            </div>
            <ChatList
              activeId={activeId}
              onSelect={(id) => {
                setActiveId(id);
                setMobileOpen(true);
              }}
            />
          </div>

          <div className={`min-h-0 ${mobileOpen ? "block" : "hidden lg:block"}`}>
            <ChatWindow conversation={active} onBack={() => setMobileOpen(false)} />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Messages;
