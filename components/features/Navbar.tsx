"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/comments", label: "Comments" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link href="/" className="brand-name" aria-label="Jackson N - home">
          Jackson N
        </Link>

        <div className="nav-links">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              data-active={pathname === l.href}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
