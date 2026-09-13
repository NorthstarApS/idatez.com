import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

type Props = {
  children: ReactNode;
  overHero?: boolean;
  hideFooter?: boolean;
  hideMobileNav?: boolean;
};

const SiteLayout = ({ children, overHero = false, hideFooter = false, hideMobileNav = false }: Props) => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header overHero={overHero} />
    <main className={`flex-1 ${overHero ? "" : "pt-16 md:pt-20"} ${hideMobileNav ? "" : "pb-16 lg:pb-0"}`}>
      {children}
    </main>
    {!hideFooter && (
      <div className={hideMobileNav ? "" : "pb-16 lg:pb-0"}>
        <Footer />
      </div>
    )}
    {!hideMobileNav && <MobileNav />}
  </div>
);

export default SiteLayout;
