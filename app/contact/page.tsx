import Link from "next/link";

const CHANNELS = [
  {
    label: "GitHub",
    value: "github.com/jackson0143",
    cta: "Visit ↗",
    href: "https://github.com/jackson0143/",
  },
  {
    label: "LinkedIn",
    value: "Jackson N",
    cta: "Connect ↗",
    href: "https://www.linkedin.com/in/jackson-n-0307a6230/",
  },
];

export default function Contact() {
  return (
    <main className="section">
      <div className="section-head">
        <h2>
          Get in <em>touch</em>
        </h2>
        {/* <span className="section-label">Contact</span> */}
      </div>

      <div className="prose" style={{ marginBottom: "48px" }}>
        <p className="lead">
          Open to collaborations and anything interesting to build. The easiest way to
          reach me is LinkedIn.
        </p>
      </div>

      <div className="list" style={{ maxWidth: "760px" }}>
        {CHANNELS.map((c) => (
          <div key={c.label} className="list-row">
            <div className="list-main">
              <h3>{c.label}</h3>
              <div className="subtitle">{c.value}</div>
            </div>
            <Link href={c.href} className="list-link">
              {c.cta}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
