import ResumeSection from "@/components/features/ResumeSection";
import ResumeItem from "@/components/features/ResumeItem";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <ResumeSection title="Experience"> {/*Heading */}
        <ResumeItem subtitle="June 2025 - August 2025"> {/*Item content */}
        <p>Software and Technology Intern at Allnex (TeaMWork Internship)</p>
        </ResumeItem>


      </ResumeSection>


      <ResumeSection title="Projects">
        <ResumeItem subtitle="Python, PyTorch, Scikit-learn, NumPy, pandas" right={<Link href="https://github.com/your-username/your-repo">GitHub</Link>}>
        <p>Email-spam-classification</p>
        </ResumeItem>

        <ResumeItem>
        <p>aaaa</p>
        </ResumeItem>
      </ResumeSection>
    </main>
  );
}
