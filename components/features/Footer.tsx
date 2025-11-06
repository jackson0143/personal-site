import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8">
      <ul className="flex flex-row items-center">

        <Link href="https://github.com/jackson0143/" className="pr-5" aria-label="GitHub" >
          <Image src="/github-mark.svg" alt="github" width={24} height={24} className="block dark:hidden" />
          <Image src="/github-mark-white.svg" alt="github" width={24} height={24} className="hidden dark:block" />
        </Link>

        <Link href="https://www.linkedin.com/in/jackson-nguyen-0307a6230/" className="pr-5" aria-label="LinkedIn" >
          <Image src="/InBug-Black.png" alt="linkedin" width={24} height={24} className="block dark:hidden" />
          <Image src="/InBug-White.png" alt="linkedin" width={24} height={24} className="hidden dark:block" />
        </Link>
        
        <Link href="mailto:***REMOVED***" aria-label="Email">
          <Mail className="w-6 h-6" />
        </Link>
      </ul>
    </footer>
  );
}


