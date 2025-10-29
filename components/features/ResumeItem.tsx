import * as React from "react";

type ResumeItemProps = React.PropsWithChildren<{
  subtitle?: React.ReactNode; // subtitle content
  right?: React.ReactNode; //right side content (eg links)
}>;

export default function ResumeItem({ children, subtitle, right }: ResumeItemProps) {
  return (
    <div className="py-2">
      <div className="flex justify-between items-baseline gap-4">
        <div className="leading-snug">{children}</div>
        {/* if exists, show right side content */}
        {right ? <div className="flex gap-3 text-sm shrink-0">{right}</div> : null}
      </div>

      {subtitle ? <p className="text-gray-500 text-sm mt-1">{subtitle}</p> : null}
    </div>
  );
}


