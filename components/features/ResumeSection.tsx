import * as React from "react";

type ResumeSectionProps = React.PropsWithChildren<{
  title: React.ReactNode;

}>;
//pass children as a prop to the component
export default function ResumeSection({ title, children}: ResumeSectionProps) {
  return (
    <section className="w-full">
      <h2 className="font-bold pt-10 pb-2 text-lg">
        <span className="main-header">
          {title}
        </span>
      </h2>

      <div className="space-y-3">{children}</div>


    </section>
  );
}


