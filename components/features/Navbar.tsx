import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";


export default function Navbar() {
  return (
    <NavigationMenu>
        <NavigationMenuList>
      <NavigationMenuItem>

        
        <NavigationMenuLink>
          <Link href="/">Home</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>


      <NavigationMenuItem>
        <NavigationMenuLink >
          <Link href="/about">About</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink>
          <Link href="/contact">Contact</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
