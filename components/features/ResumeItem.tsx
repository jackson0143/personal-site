import * as React from "react";

type ResumeItemProps = React.PropsWithChildren<{
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
  /** "experience" = blue date label + description; "list" = compact row */
  variant?: "experience" | "list";
}>;

export default function ResumeItem({
  children,
  subtitle,
  right,
  variant = "list",
}: ResumeItemProps) {
  if (variant === "experience") {
    return (
      <div className="experience-item">
        <div className="experience-line">{children}</div>
        {subtitle ? <span className="experience-date">{subtitle}</span> : null}
      </div>
    );
  }

  return (
    <div className="list-row">
      <div className="list-main">
        <h3>{children}</h3>
        {subtitle ? <div className="subtitle">{subtitle}</div> : null}
      </div>
      {right ? <div className="flex items-baseline gap-5 shrink-0">{right}</div> : null}
    </div>
  );
}
