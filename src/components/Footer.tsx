import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-foreground text-beige-light">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Image src="/logo.png" alt="Zoka" width={100} height={40} className="h-10 w-auto brightness-0 invert mb-4" />
            <p className="text-beige-dark text-sm leading-relaxed max-w-xs">
              Art-driven clothing and prints. Designed with intention, printed on demand, shipped worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/clothing" className="text-sm text-beige-dark hover:text-white transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/posters" className="text-sm text-beige-dark hover:text-white transition-colors">
                  Posters
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-4">Info</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-beige-dark">Printed &amp; fulfilled by Printful</span>
              </li>
              <li>
                <span className="text-sm text-beige-dark">Secure payments via Stripe</span>
              </li>
              <li>
                <span className="text-sm text-beige-dark">Worldwide shipping</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-beige-dark/20 text-center">
          <p className="text-xs text-beige-dark">&copy; {new Date().getFullYear()} Zoka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
