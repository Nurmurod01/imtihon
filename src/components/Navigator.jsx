import Image from "next/image";
import { BgNavi, MiniLogo } from "@/images";
import Link from "next/link";

export default function Navigator({ next }) {
  return (
    <div className="relative h-[200px] sm:h-[316px] w-full overflow-hidden">
      <Image
        src={BgNavi}
        alt="Shop banner background"
        fill
        className="object-cover brightness-95"
        priority
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <Image
          src={MiniLogo}
          alt="shop"
          className="object-contain w-16 sm:w-auto"
        />
        <h1 className="text-2xl sm:text-4xl font-bold text-black">{next}</h1>
        <div className="flex items-center space-x-2 pt-2 sm:pt-3 text-black text-sm sm:text-base">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>›</span>
          <span>{next}</span>
        </div>
      </div>
    </div>
  );
}
