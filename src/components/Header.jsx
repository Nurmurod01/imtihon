import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Hero } from "@/images";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh]  flex items-center">
      <Image
        src={Hero}
        alt="Modern living room setup"
        fill
        className="object-cover"
        priority
      />
      <div className="relative container mx-auto w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center sm:justify-end sm:p-10">
          <div className="bg-[#FFF3E3] p-10 sm:p-8 md:p-12 w-full max-w-lg sm:max-w-md lg:max-w-lg">
            <p className="text-xs sm:text-sm text-gray-600 uppercase font-semibold">
              New Arrival
            </p>
            <h1 className="text-2xl py-7 sm:text-3xl md:text-5xl font-bold text-[#B88E2F]">
              Discover Our New Collection
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
            <Link href={"#products"}>
              <Button className="bg-[#B88E2F] hover:bg-[#B88E2F]/90 text-white mt-4 px-4 sm:px-6 py-2 sm:py-3">
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
