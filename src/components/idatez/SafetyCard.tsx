import { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

const SafetyCard = ({ Icon, title, description }: Props) => (
  <article className="card-sharp h-full p-7">
    <span className="inline-flex h-12 w-12 items-center justify-center bg-accent text-accent-foreground">
      <Icon className="h-6 w-6" aria-hidden="true" />
    </span>
    <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
  </article>
);

export default SafetyCard;
