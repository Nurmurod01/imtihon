import { Bedroom, Dining, Living } from "@/images";
import Image from "next/image";

const categories = [
  {
    name: "Dining",
    img: Dining,
  },
  {
    name: "Living",
    img: Living,
  },
  {
    name: "Bedroom",
    img: Bedroom,
  },
];

export default function BrowseRange() {
  return (
    <section className="py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
            Browse The Range
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {categories.map((room) => (
            <div
              key={room.name}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={room.img || "/placeholder.svg"}
                alt={`${room.name} room`}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xl sm:text-2xl font-semibold text-white bg-black/30 px-4 py-2 rounded-md">
                  {room.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
