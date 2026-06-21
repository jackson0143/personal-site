"use client";

import { useEffect, useRef } from "react";
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
  const replayRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    // each run() claims the latest id, so a previous run
    let runId = 0;
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
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const fillLine = (line: HTMLElement, segs: Seg[]) =>
      segs.forEach(([t, c, h]) => line.appendChild(span(t, c, h)));

    async function run() {
      if (!pre) return;
      const myId = ++runId;
      const stale = () => myId !== runId;

      pre.innerHTML = "";
      const cursor = span("", "cursor");
      cursor.textContent = " ";

      if (reduce) {
        SCRIPT.forEach(({ cmd, out }) => {
          [cmd, out].forEach((segs) => {
            const line = span("", "line");
            fillLine(line, segs);
            pre.appendChild(line);
          });
        });
        return;
      }

      for (let i = 0; i < SCRIPT.length; i++) {
        const step = SCRIPT[i];
        const cmdLine = span("", "line");
        pre.appendChild(cmdLine);
        cmdLine.appendChild(cursor); // moves cursor onto this line
        for (const seg of step.cmd) {
          if (seg[1] === "prompt") {
            cmdLine.insertBefore(span(seg[0], seg[1]), cursor);
            await sleep(120);
            if (stale()) return;
            continue;
          }
          const holder = span("", seg[1]);
          cmdLine.insertBefore(holder, cursor);
          for (const ch of seg[0]) {
            holder.textContent += ch;
            await sleep(42);
            if (stale()) return;
          }
        }
        await sleep(330);
        if (stale()) return;
        const outLine = span("", "line");
        fillLine(outLine, step.out);
        pre.appendChild(outLine);
        await sleep(520);
        if (stale()) return;
      }

      const last = span("", "line");
      last.appendChild(span("$ ", "prompt"));
      last.appendChild(cursor);
      pre.appendChild(last);
    }

    replayRef.current = run;
    run();

    return () => {
      runId++; // invalidate any in-flight run on unmount
      replayRef.current = null;
    };
  }, []);

  return (
    <section className="section about-intro">
      <div className="terminal terminal-brand">
        <div className="terminal-bar">
          <div className="terminal-dots">
            <span className="dot1" />
            <span className="dot2" />
            <span className="dot3" />
          </div>
          <div className="terminal-bar-right">
            <span className="terminal-file">jackson@portfolio: ~</span>
            <button
              type="button"
              className="terminal-replay"
              onClick={() => replayRef.current?.()}
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
