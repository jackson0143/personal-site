"use client";

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (href: string) => (pathname === href ? "text-cyan-600" : "");

  return (
    <div className="flex items-center justify-between w-full">
      <span className="font-semibold">Jackson N</span>
      <NavigationMenu>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuLink>
              <Link href="/" className={linkClass("/")} >Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink>
              <Link href="/about" className={linkClass("/about")} >About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink>
              <Link href="/comments" className={linkClass("/comments")}>Comments</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink>
              <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
