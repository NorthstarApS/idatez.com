import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

type Props = {
  children: ReactNode;
  overHero?: boolean;
  hideFooter?: boolean;
};

const SiteLayout = ({ children, overHero = false, hideFooter = false }: Props) => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header overHero={overHero} />
    <main className={`flex-1 ${overHero ? "" : "pt-16 md:pt-20"} pb-16 lg:pb-0`}>{children}</main>
    {!hideFooter && (
      <div className="pb-16 lg:pb-0">
        <Footer />
      </div>
    )}
    <MobileNav />
  </div>
);

export default SiteLayout;
