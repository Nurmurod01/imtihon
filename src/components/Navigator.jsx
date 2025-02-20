import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BgNavi } from "@/images";
import Link from "next/link";

export default function Navigator({ next }) {
  return (
    <div className="relative h-[316px] w-full overflow-hidden">
      <Image
        src={BgNavi}
        alt="Shop banner background"
        fill
        className="object-cover brightness-95"
        priority
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 ">
        <h1 className="text-4xl font-bold text-black">{next}</h1>
        <div className="flex items-center space-x-2 text-black">
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
