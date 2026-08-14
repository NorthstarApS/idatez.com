import { ReactNode } from "react";

type Props = {
  step: number;
  total: number;
  title: string;
  description?: string;
  children: ReactNode;
};

const OnboardingStep = ({ step, total, title, description, children }: Props) => (
  <div className="animate-fade-in">
    <p className="eyebrow">
      Trin {step} af {total}
    </p>
    <h1 className="display-lg mt-3">{title}</h1>
    {description && <p className="mt-4 max-w-xl text-lg text-muted-foreground">{description}</p>}
    <div className="mt-10">{children}</div>
  </div>
);

export default OnboardingStep;
