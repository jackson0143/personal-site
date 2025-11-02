export default function About() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="font-bold pt-10 pb-2 text-xl">
        <span className="bg-gradient-to-r from-sky-600 to-cyan-400 bg-clip-text text-transparent">About me</span>
      </h1>

      <p className="leading-relaxed">
        I&apos;m Jackson, a Software Engineering (Honours) and Mathematics student at Monash University. 
        With a focus in fullstack development, I love building practical systems and clean UIs, and I&apos;m always proud of developing projects that are useful to people.

      </p>

      <p className="leading-relaxed">
      Recently I&apos;ve been working closely with deep learning and ML models, and I&apos;ve been using them to build mini-projects to help me learn more about the concepts and how to use them in practice. 
      Its still a long way to go, but I&apos;m excited to see what I can build with them in the future.
      </p>

      <p className="leading-relaxed">
        Outside of uni, I run a home lab for virtualisation, network management, and secure remote access. It&apos;s a fantastic way to learn the infrastructure and design choices behind modern applications, and 
        teaches me how to design, troubleshoot, and deploy in real environments. Of course I also use it to host my own projects and game servers :D 
      </p>
    <p className="leading-relaxed"></p>

      <div className="space-y-2">
        <h2 className="font-semibold">What I work with</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Python, TypeScript/JavaScript, React/Next.js, Node.js</li>
          <li>System design, databases, authentication, and building full‑stack web apps</li>
          <li>Learning more about machine learning (neural networks, automation, data analysis)</li>
        </ul>
      </div>

   

      <p className="leading-relaxed">
        I&apos;m curious, hands on, and always looking to try something new. If you&apos;re interested, feel free to <a href="mailto:jacksonn0143@gmail.com" className="text-cyan-600 underline">reach out via email</a>!
      </p>
    </main>
  );
}