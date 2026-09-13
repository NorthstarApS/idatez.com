import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/idatez/SiteLayout";
import SeoHead from "@/components/seo/SeoHead";
import { BILLING_FROM_CODE, type PublicPageContent } from "@/content/public-pages";
import { publicPageJsonLd } from "@/lib/publicPageJsonLd";

type Props = {
  page: PublicPageContent;
};

const PublicLandingPage = ({ page }: Props) => {
  const jsonLd = publicPageJsonLd(page);

  return (
    <SiteLayout hideMobileNav>
      <SeoHead title={page.title} description={page.description} path={page.path} />
      {jsonLd.map((block, index) => (
        <script
          key={`${page.slug}-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}

      <article className="container-wide py-14 md:py-20">
        <nav aria-label="Brødkrumme" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="hover:text-primary">
                Forside
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{page.kicker}</li>
          </ol>
        </nav>

        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">{page.kicker}</p>
          <h1 className="display-xl mt-4">{page.h1}</h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">{page.lede}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-14 bg-primary px-8 font-semibold hover:bg-primary-soft">
              <Link to={BILLING_FROM_CODE.ctaPath}>{BILLING_FROM_CODE.ctaLabel}</Link>
            </Button>
            <Button asChild variant="outline" className="h-14 px-8 font-semibold">
              <Link to="/discover">Se profiler</Link>
            </Button>
          </div>
        </header>

        <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="max-w-3xl space-y-14">
            {page.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                <h2 id={`${section.id}-heading`} className="display-md">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="mt-5 text-base leading-relaxed text-foreground/90 md:text-lg">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed md:text-lg">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section id="faq" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="display-md">
                Ofte stillede spørgsmål
              </h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                {page.faqs.map((faq) => (
                  <details key={faq.question} className="group py-4">
                    <summary className="cursor-pointer list-none font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-bold uppercase tracking-[0.14em]">På siden</p>
            <ol className="mt-4 space-y-3 text-sm">
              {page.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-muted-foreground hover:text-primary">
                    {section.heading}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-primary">
                  Spørgsmål
                </a>
              </li>
            </ol>
          </aside>
        </div>

        <aside className="mt-20 border-t-2 border-foreground pt-10" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-display text-2xl font-bold">
            Læs videre
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {page.related.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="flex min-h-14 items-center border border-border bg-surface px-5 font-semibold hover:border-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <section className="mt-16 bg-gradient-primary p-10 text-primary-foreground md:p-14">
          <h2 className="display-md max-w-2xl">Klar til at møde nogen i virkeligheden?</h2>
          <p className="mt-4 max-w-xl text-primary-foreground/90">{BILLING_FROM_CODE.ctaLabel}. Så går du videre til de otte korte spørgsmål.</p>
          <Button asChild className="mt-8 h-14 bg-ink px-8 font-semibold text-ink-foreground hover:bg-ink/90">
            <Link to={BILLING_FROM_CODE.ctaPath}>{BILLING_FROM_CODE.ctaLabel}</Link>
          </Button>
        </section>
      </article>
    </SiteLayout>
  );
};

export default PublicLandingPage;
