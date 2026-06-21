import * as React from "react";

type ResumeSectionProps = React.PropsWithChildren<{
  title: React.ReactNode;
  /** small uppercase muted label shown at the right of the section header */
  label?: React.ReactNode;
}>;

export default function ResumeSection({ title, label, children }: ResumeSectionProps) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        {label ? <span className="section-label">{label}</span> : null}
      </div>
      {children}
    </section>
  );
}
