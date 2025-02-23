import { FurnitureImg } from "@/images";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative bg-[#F9F1E7] py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              We Create Your Home More Aesthetic
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Furniture power is a software as services for multipurpose
              business management system, especially for furniture business.
            </p>
          </div>
          <div className="relative h-64 sm:h-80 md:h-[400px]">
            <Image
              src={FurnitureImg}
              alt="Modern furniture showcase"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
