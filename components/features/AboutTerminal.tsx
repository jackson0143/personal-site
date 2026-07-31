"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCw } from "lucide-react";

/**
 * Bash terminal that types itself out
 */

type Seg = [string, string, string?];
type Step = { cmd: Seg[]; out: Seg[] };


/*Format of segments * [text, class, href] */
const SCRIPT: Step[] = [
  {
    cmd: [["$ ", "prompt"], ["whoami", "cmd"]],
    out: [["jackson", "hi"], [" - software engineering & mathematics", "out"]],
  },
  {
    cmd: [["$ ", "prompt"], ["cat hobbies.txt", "cmd"]],
    out: [["self-hosting · Bloons TD6 · learning new stuff", "out"]],
  },
  {
    cmd: [["$ ", "prompt"], ["uptime", "cmd"]],
    out: [["still working · no plans to stop", "out"]],
  },
  {
    cmd: [["$ ", "prompt"], ["contact ", "cmd"], ["--open", "flag"]],
    out: [
      ["github.com/jackson0143", "out", "https://github.com/jackson0143"],
      [" · ", "out"],
      [
        "linkedin.com/in/jackson-n-0307a6230/",
        "out",
        "https://www.linkedin.com/in/jackson-n-0307a6230/",
      ],
    ],
  },
];

export default function AboutTerminal() {
  const preRef = useRef<HTMLPreElement>(null);
  // bumping this re-runs the effect
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const span = (text: string, cls: string, href?: string) => {
      const el = document.createElement(href ? "a" : "span");
      if (cls) el.className = cls;
      el.textContent = text;
      if (href) {
        const a = el as HTMLAnchorElement;
        a.href = href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      return el;
    };
      const sleep = (ms: number) =>
      reduce ? Promise.resolve() : new Promise<void>((r) => setTimeout(r, ms));
    const fillLine = (line: HTMLElement, segs: Seg[]) =>
      segs.forEach(([t, c, h]) => line.appendChild(span(t, c, h)));

    const run = async () => {
      pre.innerHTML = "";
      const cursor = span(" ", "cursor");

      for (const step of SCRIPT) {
        const cmdLine = span("", "line");
        pre.appendChild(cmdLine);
        cmdLine.appendChild(cursor); // moves cursor onto this line
        for (const [text, cls] of step.cmd) {
          const holder = span("", cls);
          cmdLine.insertBefore(holder, cursor);
          if (cls === "prompt") {
            holder.textContent = text;
            await sleep(120);
            if (cancelled) return;
          } else {
            for (const ch of text) {
              holder.textContent += ch;
              await sleep(42);
              if (cancelled) return;
            }
          }
        }
        await sleep(330);
        if (cancelled) return;
        const outLine = span("", "line");
        fillLine(outLine, step.out);
        pre.appendChild(outLine);
        await sleep(520);
        if (cancelled) return;
      }

      const last = span("", "line");
      last.appendChild(span("$ ", "prompt"));
      last.appendChild(cursor);
      pre.appendChild(last);
    };

    run();
    return () => {
      cancelled = true; // stop any in-flight run on unmount or replay
    };
  }, [replay]);

  return (
    <section className="section about-intro">
      <div className="terminal">
        <div className="terminal-bar">
          <div className="terminal-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="terminal-bar-right">
            <span className="terminal-file">jackson@portfolio: ~</span>
            <button
              type="button"
              className="terminal-replay"
              onClick={() => setReplay((n) => n + 1)}
              aria-label="Replay"
              title="Replay"
            >
              <RotateCw size={13} />
            </button>
          </div>
        </div>
        <div className="terminal-body">
          <pre ref={preRef} />
        </div>
      </div>
    </section>
  );
}
