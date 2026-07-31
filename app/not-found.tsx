import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div>
        <p className="text-muted-foreground">404</p>
        <h1 className="mt-1 text-4xl font-bold leading-tight">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          Sorry, this might be a mistake on my part :(
        </p>
      </div>

      <Button asChild>
        <Link href="/">Go to Home</Link>
      </Button>
    </section>
  );
}
