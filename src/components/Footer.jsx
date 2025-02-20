import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">Funiro.</h3>
            <p className="text-sm text-muted-foreground">
              400 University Drive Suite 200 Coral Gables,
              <br />
              FL 33134 USA
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Help</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/payment"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Payment Options
              </Link>
              <Link
                href="/returns"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Returns
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policies
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Newsletter</h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border-black  border-b px-3 py-2 text-sm"
              />
              <Button type="submit" className="" variant="outline">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>©2023 Funiro. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
