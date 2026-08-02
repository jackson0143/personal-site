import ResumeSection from "@/components/features/ResumeSection";
import ResumeItem from "@/components/features/ResumeItem";
import AboutTerminal from "@/components/features/AboutTerminal";
import Link from "next/link";

type Project = {
  title: string;
  tags: string[];
  links: { label: string; href: string }[];
};

const PROJECTS: Project[] = [
  {
    title: "Email-spam-classification",
    tags: ["Python", "PyTorch", "Scikit-learn", "NumPy", "pandas"],
    links: [
      { label: "GitHub", href: "https://github.com/jackson0143/Email-spam-classification" },
    ],
  },
  {
    title: "StudySync",
    tags: ["Next.js", "TypeScript", "Node.js", "Supabase", "PostgreSQL"],
    links: [
      { label: "Live", href: "https://studysync-hackathon.vercel.app/" },
      { label: "GitHub", href: "https://github.com/olivewensemius/studysync" },
    ],
  },
  {
    title: "Proxmox Mobile Dashboard",
    tags: ["Flutter", "FastAPI"],
    links: [
      { label: "GitHub", href: "https://github.com/jackson0143/proxmox-dashboard-mobile" },
    ],
  },
  // {
  //   title: "File Parser Form",
  //   tags: ["Python", "LangChain", "OpenAI"],
  //   links: [
  //     { label: "GitHub", href: "https://github.com/jackson0143/File-Parser-LLM" },
  //   ],
  // },
];

export default function Home() {
  return (
    <main>
      <AboutTerminal />

      <ResumeSection title="Experience">
        <ResumeItem variant="experience" subtitle="February 2025 - November 2025">
          built a multi-tenant estate management platform for the startup{" "}
          <Link href="https://herekind.com.au/" target="_blank">
            Herekind
          </Link>
        </ResumeItem>
        <ResumeItem variant="experience" subtitle="June 2025 - August 2025">
          built a risk assessment dashboard for{" "}
          <Link href="https://allnex.com/" target="_blank">
            Allnex
          </Link>
        </ResumeItem>
      </ResumeSection>

      <ResumeSection title="Projects">
        <div className="projects">
          {PROJECTS.map((p) => (
            <div key={p.title} className="project-item">
              <div className="project-head">
                <h3>{p.title}</h3>
                <div className="project-links">
                  {p.links.map((l) => (
                    <Link key={l.href} href={l.href}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Publications">
        <div className="list">
          <ResumeItem
            variant="list"
            subtitle="ICSE MSSiS 2026"
            right={
              <Link href="https://arxiv.org/abs/2603.09100" className="list-link">
                Link
              </Link>
            }
          >
            Class Model Generation from Requirements using Large Language Models
            (accepted to the ICSE MSSiS 2026 workshop).
          </ResumeItem>
        </div>
      </ResumeSection>
{/* 
      <ResumeSection title="Hackathons">
        <div className="list">
          <ResumeItem
            variant="list"
            subtitle="StudySync"
            right={
              <Link href="https://devpost.com/software/studysync-vpr31h/" className="list-link">
                Devpost
              </Link>
            }
          >
            UNIHACK 2025
          </ResumeItem>
        </div>
      </ResumeSection> */}
    </main>
  );
}
