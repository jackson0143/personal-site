import Link from "next/link";

export default function About() {
  return (
    <main className="section">
      <div className="section-head">
        <h2>
          About <em>me</em>
        </h2>
        {/* <span className="section-label">Profile</span> */}
      </div>

      <div className="prose">
        <p >
          Hi, I&rsquo;m Jackson. I love
          building practical systems and working on projects that are useful to people.
       
        </p>

        <p>
          Recently I&rsquo;ve been working closely with deep learning and ML models, and
          I&rsquo;ve been using them to build mini-projects to help me learn more about the
          concepts and how to use them in practice. Its still a long way to go, but
          I&rsquo;m excited to see what I can build with them in the future.
        </p>

        <p>
          Outside of work, I play around with homelab stuff like virtualisation, network management, and deploying various services. It&rsquo;s a fantastic way to learn the infrastructure and
          design choices behind modern applications, and teaches me how to design,
          troubleshoot, and deploy in real environments. Of course I also use it to host
          my own projects and game servers 😀
        </p>

        <p style={{ marginTop: "18px" }}>
          I&rsquo;m curious, hands on, and always looking to try something new. If
          you&rsquo;re interested, feel free to{" "}
          <Link href="/contact" className="list-link" style={{ display: "inline" }}>
            reach out
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
