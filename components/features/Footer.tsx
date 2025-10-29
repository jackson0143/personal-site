import * as React from "react";
import Link from "next/link";
import Image from "next/image";


export default function Footer() {
  return (
    <footer className="py-8">
      <ul className="flex flex-row items-center">
        <Link href="https://github.com/jackson0143/" className="pr-5" aria-label="GitHub" >
          <Image src="/github-mark.png" alt="github" width={24} height={24} />
        </Link>
        <Link href="https://www.linkedin.com/in/jackson-nguyen-0307a6230/" className="pr-5" aria-label="LinkedIn" >
          <Image src="/linkedin.svg" alt="github" width={24} height={24} />
        </Link>
      </ul>
    </footer>
  );
}


