import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Hero } from "@/images";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] flex items-center">
      <div className="relative w-full h-full">
        <Image
          src={Hero}
          alt="Modern living room setup"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-end p-10">
          <div className="bg-[#FFF3E3] p-8 md:p-12  max-w-lg">
            <p className="text-sm text-gray-600 uppercase font-semibold">New Arrival</p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#B88E2F]">
              Discover Our New Collection
            </h1>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
            <Button className="bg-[#B88E2F] hover:bg-[#B88E2F]/90 text-white mt-4 px-6 py-3">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
