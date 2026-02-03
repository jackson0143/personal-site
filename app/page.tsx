import ResumeSection from "@/components/features/ResumeSection";
import ResumeItem from "@/components/features/ResumeItem";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <ResumeSection title="Experience">
        <ResumeItem subtitle="February 2025 - November 2025">
          <p>
            built a multi-tenant estate management platform for the startup{" "}
            <Link href="https://herekind.com.au/" target="_blank">
              <u>Herekind</u>
            </Link>
          </p>
        </ResumeItem>
        <ResumeItem subtitle="June 2025 - August 2025">
          <p>
            built a risk assessment dashboard for{" "}
            <Link href="https://allnex.com/" target="_blank">
              <u>Allnex</u>
            </Link>{" "}
            (TeaMWork Internship)
          </p>
        </ResumeItem>
      </ResumeSection>

      <ResumeSection title="Projects">
        <ResumeItem
          subtitle="Python, PyTorch, Scikit-learn, NumPy, pandas"
          right={
            <>
              <Link
                href="https://github.com/jackson0143/Email-spam-classification"
                className="hover:underline"
              >
                GitHub
              </Link>
            </>
          }
        >
          <p>Email-spam-classification</p>
        </ResumeItem>

        <ResumeItem
          subtitle="Next.js, TypeScript, Node.js, Supabase, PostgreSQL"
          right={
            <>
              <Link
                href="https://studysync-hackathon.vercel.app/"
                className="hover:underline mr-3"
              >
                Live
              </Link>
              <Link
                href="https://github.com/olivewensemius/studysync"
                className="hover:underline"
              >
                GitHub
              </Link>
            </>
          }
        >
          <p>StudySync</p>
        </ResumeItem>

        <ResumeItem
          subtitle="Flutter, FastAPI"
          right={
            <>
              <Link
                href="https://github.com/jackson0143/proxmox-dashboard-mobile"
                className="hover:underline"
              >
                GitHub
              </Link>
            </>
          }
        >
          <p>Proxmox Mobile Dashboard</p>
        </ResumeItem>

        <ResumeItem
          subtitle="Python, LangChain, OpenAI"
          right={
            <>
              <Link
                href="https://github.com/jackson0143/File-Parser-LLM"
                className="hover:underline"
              >
                GitHub
              </Link>
            </>
          }
        >
          <p>File Parser Form</p>
        </ResumeItem>
      </ResumeSection>

      <ResumeSection title="Hackathons">
        <ResumeItem
          subtitle="StudySync"
          right={
            <>
              <Link
                href="https://devpost.com/software/studysync-vpr31h/"
                className="hover:underline"
              >
                <p>Devpost</p>
              </Link>
            </>
          }
        >
          <p>UNIHACK 2025</p>
        </ResumeItem>
      </ResumeSection>

      <ResumeSection title="Publications">
        <ResumeItem
          subtitle="ICSE MSSiS 2026"
          right={
            <>
              <Link
                href="https://conf.researchr.org/home/icse-2026/mssis-2026#Accepted-Papers"
                className="hover:underline"
              >
                <p>Link</p>
              </Link>
            </>
          }
        >
          <p>
            Class Model Generation from Requirements using Large Language Models
            (accepted to the ICSE MSSiS 2026 workshop).
          </p>
        </ResumeItem>
      </ResumeSection>
    </main>
  );
}
